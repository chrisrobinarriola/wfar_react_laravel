<?php

namespace App\Http\Controllers\API;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Weeks;
use App\Models\Wfar;
use App\Models\User;
use Validator;

class WeeksController extends Controller
{
    public function index(){
        $weeks = Weeks::orderBy('id', 'DESC')->get();

        return response()->json([
            'status' => 200,
            'weeks' => $weeks
        ]);
    }

    public function faculty_week(Request $request){
        $assigned_to = User::select('assigned_to')->where('id', $request->faculty)->value('assigned_to');

        $weeks = Weeks::orderBy('id', 'DESC')
        ->where('added_by', $assigned_to)
        ->get();

        return response()->json([
            'status' => 200,
            'weeks' => $weeks
        ]);
    }

    public function add_week(Request $request, $id){
        //SEMESTER ID

        $validator = Validator::make( $request->all(), [
            'name' => 'required|max:191',
            'semester_id' => 'required'
        ]);

        if($validator->fails()){
            return response()->json([
                'validate_err' => $validator->messages(),
            ]);
        } else{
            $week = new Weeks();
            $week->name = $request->name;
            $week->semester_id = $id;
            $week->added_by = $request->added_by;
            $week->save();
    
            return response()->json([
                'status' => 200,
                'message' => 'Week Added Successfully'
            ]);
        }
    }

    public function edit_week($id){
        $week = Weeks::find($id);
        $added_by_raw = Weeks::select('added_by')->where('id', $id)->value('added_by');
        $added_by = User::select('name')->where('id', $added_by_raw)->value('name');

        $wfars = Wfar::select('id', 'subject', 'week_number')
        ->where('week_number', $id)
        ->where('status', 'approved')
        ->orderBy('id', 'DESC')->get();

        if($week){
            return response()->json([
                'status' => 200,
                'added_by' => $added_by,
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

    public function update_week(Request $request, $id){
        $week = Weeks::find($id);
        $week->name = $request->name;
        $week->update();

        return response()->json([
            'status' => 200,
            'message' => 'Week Updated Successfully'
        ]);
    }

}
