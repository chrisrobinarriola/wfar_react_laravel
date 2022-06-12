<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\API\StudentController;
use App\Http\Controllers\API\SemesterController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\WeeksController;
use App\Http\Controllers\API\WFARController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/return_token', [UserController::class, 'return_token']);

Route::get('/students', [StudentController::class, 'index']);
Route::post('/add-student', [StudentController::class, 'store']);
Route::get('/edit-student/{id}', [StudentController::class, 'edit_student']);

Route::put('update-student/{id}', [StudentController::class, 'update_student']);
Route::delete('delete-student/{id}', [StudentController::class, 'delete_student']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//USERS
Route::get('/users', [UserController::class, 'index']);
Route::get('/users-request', [UserController::class, 'index_request']);
Route::post('/add-user', [UserController::class, 'store']);
Route::get('/add-user', [UserController::class, 'add_user']);
Route::get('/edit-user/{id}', [UserController::class, 'edit_user']);
Route::put('update-user/{id}', [UserController::class, 'update_user']);
Route::post('/register', [UserController::class, 'register']);
Route::post('/login_post', [UserController::class, 'login_post']);
Route::post('/approve-registration/{id}', [UserController::class, 'approve_registration']);
Route::post('/reject-registration/{id} ', [UserController::class, 'reject_registration']);

Route::put('update-profile/{id}', [UserController::class, 'update_profile']);
Route::put('update-password/{id}', [UserController::class, 'update_password']);

//SEMESTERS
Route::get('/semester', [SemesterController::class, 'index']);
Route::post('/add-semester', [SemesterController::class, 'add_semester']);
Route::get('/edit-semester/{id}', [SemesterController::class, 'edit_semester']);
Route::put('update-semester/{id}', [SemesterController::class, 'update_semester']);

//WEEKS
Route::get('/weeks', [WeeksController::class, 'index']);
Route::post('/add-week/{id}', [WeeksController::class, 'add_week']);
Route::get('/edit-week/{id}', [WeeksController::class, 'edit_week']);
Route::put('update-week/{id}', [WeeksController::class, 'update_week']);

//WFAR
Route::get('/wfars', [WFARController::class, 'index']);
Route::post('/add-wfar/{id}', [WFARController::class, 'add_wfar']);
Route::get('/edit-wfar/{id}', [WFARController::class, 'edit_wfar']);
Route::put('update-wfar/{id}', [WFARController::class, 'update_wfar']);

Route::post('/new-wfar', [WFARController::class, 'new_wfar']);

Route::post('/approve-wfar/{id}', [WFARController::class, 'approve_wfar']);
Route::post('/reject-wfar/{id}', [WFARController::class, 'reject_wfar']);

//LANDING PAGES
Route::get('/faculty-landing', [SemesterController::class, 'faculty_landing']);
Route::post('/faculty-week', [WeeksController::class, 'faculty_week']);
Route::get('faculty-wfars', [WeeksController::class, 'faculty_wfars']);
Route::get('faculty-pending-wfars/{id}', [WFARController::class, 'faculty_pending_wfars']);

Route::get('/chair-landing', [SemesterController::class, 'chair_landing']);

Route::middleware(['auth:api'])->group(function () {
    Route::get('/user', [UserController::class, 'index']);
});


