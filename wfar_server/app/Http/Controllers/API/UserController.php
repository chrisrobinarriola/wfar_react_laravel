<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\User;
use Auth;
use Hash;
use DB;

use Validator;

class UserController extends Controller
{
    public function return_token(Request $request){
        return $request->user();
    }

    public function index(Request $request){
        $users = User::select('id', 'name', 'role', 'email')->where('status', 'active')->orderBy('id', 'DESC')->get();
        return response()->json([
            'status' => 200,
            'users' => $users
        ]);
    }

    public function index_request(Request $request){
        $users = User::select('id', 'name', 'role', 'email')->where('status', 'for checking')->orderBy('id', 'DESC')->get();
        return response()->json([
            'status' => 200,
            'users' => $users
        ]);
    }

    public function store(Request $request){
        $validator = Validator::make( $request->all(), [
            'name' => 'required|max:191',
            'username' => 'required|max:191',
            'email' => 'required|email|max:191',
            'role' => 'required|max:191',
            'assigned_to' => 'required|max:191',
            'status' => 'required|max:191',
            'password' => 'required|confirmed|min:8'
        ]);

        if($validator->fails()){
            return response()->json([
                'validate_err' => $validator->messages(),
            ]);
        } else{
            $user = new User();
            $user->name = $request->name;
            $user->username = $request->username;
            $user->email = $request->email;
            $user->role = $request->role;
            $user->assigned_to = $request->assigned_to;
            $user->status = 'active';
            $user->password = Hash::make($request->password);
            $user->save();
    
            return response()->json([
                'status' => 200,
                'message' => 'User Added Successfully'
            ]);
        }
    }

    //GET || VIEWING ADD USER PAGE
    public function add_user(){
        $chairs = User::select('id', 'name')->where('role', 'chair')->where('status', 'active')->get();

        if($chairs){
            return response()->json([
                'status' => 200,
                'chairs' => $chairs,
            ]);
        } else{
            return response()->json([
                'status' => 404,
                'message' => 'User ID not found'
            ]);
        }
    }

    public function register(Request $request){
        $validator = Validator::make( $request->all(), [
            'name' => 'required|max:191',
            'username' => 'required|max:191',
            'email' => 'required|email|max:191',
            'role' => 'required|max:191',
            'status' => 'required|max:191',
            'password' => 'required|confirmed|min:8'
        ]);

        if($validator->fails()){
            return response()->json([
                'validate_err' => $validator->messages(),
            ]);
        } else{
            $user = new User();
            $user->name = $request->name;
            $user->username = $request->username;
            $user->email = $request->email;
            $user->role = $request->role;
            $user->status = 'for checking';
            $user->password = Hash::make($request->password);
            $user->save();
    
            return response()->json([
                'status' => 200,
                'message' => 'Successfully sent a registration request!'
            ]);
        }
    }

    public function approve_registration(Request $request, $id){
        $user = User::find($id);
        $user->name = $request->name;
        $user->username = $request->username;
        $user->email = $request->email;
        $user->role = $request->role;
        $user->assigned_to = $request->assigned_to;
        $user->status = 'active';
        $user->update();

        return response()->json([
            'status' => 200,
            'message' => 'User Account Accepted'
        ]);
    }

    public function reject_registration(Request $request, $id){
        $user = User::find($id);
        $user->name = $request->name;
        $user->username = $request->username;
        $user->email = $request->email;
        $user->role = $request->role;
        $user->assigned_to = $request->assigned_to;
        $user->status = 'rejected';
        $user->update();

        return response()->json([
            'status' => 200,
            'message' => 'User Request Rejected'
        ]);
    }

    public function edit_user($id){
        $user = User::find($id);

        $chairs = User::select('id', 'name')->where('role', 'chair')->where('status', 'active')->get();

        if($user){
            return response()->json([
                'status' => 200,
                'user' => $user,
                'chairs' => $chairs,
            ]);
        } else{
            return response()->json([
                'status' => 404,
                'message' => 'User ID not found'
            ]);
        }
    }

    public function update_user(Request $request, $id){
        $user = User::find($id);
        $user->name = $request->name;
        $user->username = $request->username;
        $user->email = $request->email;
        $user->role = $request->role;
        $user->assigned_to = $request->assigned_to;
        $user->update();

        return response()->json([
            'status' => 200,
            'message' => 'User Updated Successfully'
        ]);
    }

    public function update_profile(Request $request, $id){
        $user = User::find($id);
        $user->name = $request->name;
        $user->username = $request->username;
        $user->email = $request->email;
        $user->update();

        return response()->json([
            'status' => 200,
            'message' => 'User Updated Successfully'
        ]);
    }

    public function update_password(Request $request, $id){
        $user = User::find($id);
        $user->password = Hash::make($request->password);
        $user->update();

        return response()->json([
            'status' => 200,
            'message' => 'Password Updated Successfully'
        ]);
    }

    public function login_post(Request $request){
        $credentials = $request->validate([
            'username' => 'required',
            'password' => 'required'
        ]);

        $role = User::select('role')->where('username', $request->username)->value('role');

        $status = User::select('status')->where('username', $request->username)->value('status');

        $user_id = User::select('id')->where('username', $request->username)->value('id');

        $name = User::select('name')->where('username', $request->username)->value('name');

        if($status == 'for checking'){
            return response()->json([
                'status' => 401,
                'message' => 'Your request for registration is still pending. Please wait for the admin to accept your request.'
            ]);
        } else{
            if(Auth::attempt($credentials)){
                $user = Auth::user();
                $token = md5(time()) . '.' . md5($request->email);
    
                $user->forceFill([
                    'api_token' => $token,
                ])->save();
    
                return response()->json([
                    'status' => 200,
                    'username' => $request->username,
                    'name' => $name,
                    'id' => $user_id,
                    'role' => $role,
                    'token' => $token
                ]);
            }
    
            return response()->json([
                'status' => 401,
                'message' => 'The provided credentials does not match our records.'
            ]);
        }
    }

    public function logout(Request $request){
        $request->user()->forceFill([
            'api_token' => null
        ])->save();

        return response()->json(['message' => 'success']);
    }
}
