<?php

namespace App\Http\Controllers\API;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\WFAR;
use App\Models\User;
use Validator;

class WFARController extends Controller
{
    public function index(){
        $wfars = WFAR::orderBy('id', 'DESC')->get();;

        return response()->json([
            'status' => 200,
            'wfars' => $wfars
        ]);
    }

    public function new_wfar(Request $request){
        //ADD WHERE ADDED BY

        //ADDED BY FROM WFAR
        $faculty = User::select('name')->where('assigned_to', $request->chair)->value('name');

        $wfars = WFAR::select('id', 'subject', 'date_of_class')
        ->where('status', 'for checking')
        ->where('added_by', $faculty)
        ->orderBy('id', 'DESC')->get();

        return response()->json([
            'status' => 200,
            'wfars' => $wfars
        ]);
    }

    public function approve_wfar(Request $request, $id){
        WFAR::where('id', $id)->update([
            'status' => 'approved'
        ]);

        return response()->json([
            'status' => 200,
            'message' => 'WFAR Approved!'
        ]);
    }

    public function reject_wfar(Request $request, $id){
        WFAR::where('id', $id)->update([
            'status' => 'rejected'
        ]);

        return response()->json([
            'status' => 200,
            'message' => 'WFAR Rejected!'
        ]);
    }

    public function faculty_pending_wfars($id){
        $user = User::where('username', $id)->value('name');
        $wfars = WFAR::where('added_by', $user)->where('status', 'for checking')->orderBy('id', 'DESC')->get();

        return response()->json([
            'status' => 200,
            'wfars' => $wfars
        ]);
    }

    public function add_wfar(Request $request, $id){
        //SEMESTER ID

        $validator = Validator::make( $request->all(), [
            'subject' => 'required|max:191',
            'week_number' => 'required|max:191',
            'date_of_class' => 'required|max:191',
            'course_year_section' => 'required|max:191',
            'number_of_attendees' => 'required|max:191',
            'meeting_link' => 'required|max:191',
            'learning_activities' => 'required|max:191',
            'other_details' => 'required|max:191'
        ]);

        if($validator->fails()){
            return response()->json([
                'validate_err' => $validator->messages(),
            ]);
        } else{
            $wfar = new Wfar();
            $wfar->subject = $request->subject;
            $wfar->week_number = $id;
            $wfar->date_of_class = $request->date_of_class;
            $wfar->course_year_section = $request->course_year_section;
            $wfar->number_of_attendees = $request->number_of_attendees;
            $wfar->meeting_link = $request->meeting_link;
            $wfar->learning_activities = $request->learning_activities;
            $wfar->other_details = $request->other_details;
            $wfar->attachment_1 = $request->attachment_1;
            $wfar->added_by = $request->added_by;
            $wfar->status = 'for checking';
            $wfar->save();
    
            return response()->json([
                'status' => 200,
                'message' => 'WFAR Added Successfully'
            ]);
        }
    }

    public function edit_wfar($id){
        $wfar = WFAR::find($id);

        if($wfar){
            return response()->json([
                'status' => 200,
                'wfar' => $wfar,
            ]);
        } else{
            return response()->json([
                'status' => 404,
                'message' => 'WFAR ID not found'
            ]);
        }
    }

    public function update_wfar(Request $request, $id){
        $wfar = WFAR::find($id);
        $wfar->subject = $request->subject;
        $wfar->date_of_class = $request->date_of_class;
        $wfar->course_year_section = $request->course_year_section;
        $wfar->number_of_attendees = $request->number_of_attendees;
        $wfar->meeting_link = $request->meeting_link;
        $wfar->learning_activities = $request->learning_activities;
        $wfar->other_details = $request->other_details;
        $wfar->attachment_1 = $request->attachment_1;
        $wfar->update();

        return response()->json([
            'status' => 200,
            'message' => 'WFAR Updated Successfully'
        ]);
    }
}
