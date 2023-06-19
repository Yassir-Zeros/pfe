<?php

use App\Http\Controllers\GestionController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\UserController;
use App\Models\Gestion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('login', [AuthController::class,'login']);
Route::post('register', [AuthController::class,'register']);

Route::group(['middleware'=>'api'],function(){
    Route::post('logout', [AuthController::class,'logout']);
    Route::post('refresh', [AuthController::class,'refresh']);
    Route::post('me', [AuthController::class,'me']);
});

Route::apiResource('/gestion',GestionController::class);
Route::get('/gestiono', function () {
    return DB::table('gestions')->where('type', 'non reçu')->orderBy('created_at', 'ASC')->get();
});
Route::get('/notif/{destinataire}', function ($destinataire) {
    return DB::table('gestions')->where('destinataire',$destinataire)->where('status',0)->orderBy('created_at', 'ASC')->get();
});
Route::apiResource('/users',UserController::class);
Route::get('images', [ImageController::class, 'index']);
Route::post('images', [ImageController::class, 'upload'])->name('images');
Route::get('/magestion/{id}', [GestionController::class, 'show']);
Route::put('/update/{id}', function ($id) {
    $gestion = Gestion::find($id);
    $gestion->status = 1;
    $gestion->save();
});
Route::apiResource("/settings",SettingsController::class);
Route::delete("/delSettings/{id}", function ($id) {
    $settings = \App\Models\Settings::find($id);
    if ($settings) {
        $settings->delete();
        return response(null, 204);
    } else {
        return response()->json(['error' => 'Settings not found'], 404);
    }
});

