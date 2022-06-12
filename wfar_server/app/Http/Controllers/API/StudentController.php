<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Student;
use Validator;

class StudentController extends Controller
{
    public function index(){
        $students = Student::all();

        return response()->json([
            'status' => 200,
            'students' => $students
        ]);
    }

    public function store(Request $request){
        $validator = Validator::make( $request->all(), [
            'name' => 'required|max:191',
            'course' => 'required|max:191',
            'email' => 'required|email|max:191',
            'phone' => 'required|numeric'
        ]);

        if($validator->fails()){
            return response()->json([
                'validate_err' => $validator->messages(),
            ]);
        } else{
            $student = new Student();
            $student->name = $request->name;
            $student->course = $request->course;
            $student->email = $request->email;
            $student->phone = $request->phone;
            $student->save();
    
            return response()->json([
                'status' => 200,
                'message' => 'Student Added Successfully'
            ]);
        }
    }

    public function edit_student($id){
        $student = Student::find($id);
        if($student){
            return response()->json([
                'status' => 200,
                'student' => $student
            ]);
        } else{
            return response()->json([
                'status' => 404,
                'message' => 'Student ID not found'
            ]);
        }
       
    }

    public function update_student(Request $request, $id){
        $student = Student::find($id);
        $student->name = $request->name;
        $student->course = $request->course;
        $student->email = $request->email;
        $student->phone = $request->phone;
        $student->update();

        return response()->json([
            'status' => 200,
            'message' => 'Student Updated Successfully'
        ]);
    }

    public function delete_student(Request $request, $id){
        $student = Student::find($id);
        $student->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Student Deleted Sucessfully'
        ]);
    }
}
