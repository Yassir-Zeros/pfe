<?php

namespace App\Http\Controllers;

use App\Models\Settings;
use App\Http\Requests\StoreSettingsRequest;
use App\Http\Requests\UpdateSettingsRequest;
use Illuminate\Support\Facades\DB;

class SettingsController extends Controller
{
    public function index()
    {
        $res = \App\Models\Settings::all();
        return response($res);
    }
    public function store(StoreSettingsRequest $request)
    {
        $result = DB::table('settings')->insert($request->all());
        if ($result){
            return response($result);
        }
    }
    public function destroy(Settings $settings)
    {
        $settings->delete();
        return response()->json(['message' => 'Setting deleted successfully.'], 204);
    }
}
