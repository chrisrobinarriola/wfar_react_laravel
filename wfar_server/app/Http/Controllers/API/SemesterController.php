<?php

namespace App\Http\Controllers\API;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Semester;
use App\Models\Weeks;
use App\Models\WFAR;
use App\Models\User;
use Validator;
use DB;

class SemesterController extends Controller
{
    public function index(){
        $semesters = Semester::orderBy('id', 'DESC')->get();

        return response()->json([
            'status' => 200,
            'semesters' => $semesters
        ]);
    }

    public function faculty_landing(){
        $wfars = Wfar::select('id', 'subject', 'week_number')->get();

        return response()->json([
            'status' => 200,
            'wfars' => $wfars
        ]);
    }

    public function chair_landing(){
        $week = Weeks::find($id);
        $wfars = Wfar::select('id', 'subject', 'week_number')->where('week_number', $id)->get();

        if($week){
            return response()->json([
                'status' => 200,
                'week' => $week,
                'wfars' => $wfars
            ]);
        } else{
            return response()->json([
                'status' => 404,
                'message' => 'Semester ID not found'
            ]);
        }
    }

    public function add_semester(Request $request){
        $validator = Validator::make( $request->all(), [
            'name' => 'required|max:191'
        ]);

        if($validator->fails()){
            return response()->json([
                'validate_err' => $validator->messages(),
            ]);
        } else{
            $semester = new Semester();
            $semester->name = $request->name;
            $semester->save();
    
            return response()->json([
                'status' => 200,
                'message' => 'Semester Added Successfully'
            ]);
        }
    }

    public function edit_semester($id){
        $semester = Semester::find($id);

        $weeks = Weeks::select('id', 'name', 'semester_id')
        ->where('semester_id', $id)
        ->orderBy('id', 'DESC')
        ->get();

        $reports = Weeks::join('wfars', 'weeks.id', '=', 'wfars.week_number')
        ->select(DB::raw('COUNT(weeks.name) as counter, weeks.name'), 'wfars.added_by')
        ->where('weeks.semester_id', $id)
        ->groupBy('weeks.name')
        ->groupBy('added_by')
        ->get();

        $faculty = User::select('id', 'name')->where('role', 'faculty')->get();

        $reports2 = Weeks::join('wfars', 'weeks.id', '=', 'wfars.week_number')
        ->select(DB::raw('count(weeks.name) as counters, weeks.name'), 'wfars.added_by')
        ->where('weeks.semester_id', $id)
        ->groupBy('weeks.name')
        ->groupBy('added_by')
        ->get();

        //return $reports;
        //REPORTS
        //$reports = WFAR::select('id', 'subject', 'added_by')
        //->where('week_number', )

        /* 
        $results = DB::table('users_quiz')
        ->join('users', 'users_quiz.user_id', '=', 'users.id')
        ->join('modules', 'users_quiz.module_id', '=', 'modules.id')
        ->select('users_quiz.id', 'users.name as user_name', 'modules.name', 'users_quiz.result', 'users_quiz.status', 'users_quiz.created_at')
        ->get();
        return view('results', ['results' => $results]); */

        if($semester){
            return response()->json([
                'status' => 200,
                'semester' => $semester,
                'weeks' => $weeks,
                'faculty' => $faculty,
                'reports' => $reports2
            ]);
        } else{
            return response()->json([
                'status' => 404,
                'message' => 'Semester ID not found'
            ]);
        }
    }

    public function update_semester(Request $request, $id){
        $semester = Semester::find($id);
        $semester->name = $request->name;
        $semester->update();

        return response()->json([
            'status' => 200,
            'message' => 'Semester Updated Successfully'
        ]);
    }
}
