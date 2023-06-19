<?php

namespace App\Http\Controllers;

use App\Models\Gestion;
use App\Http\Requests\StoreGestionRequest;
use App\Http\Requests\UpdateGestionRequest;
use Illuminate\Support\Facades\DB;

class GestionController extends Controller
{
    
    public function index()
    {
        $users = DB::table('gestions')->where('type', 'reçu')->orderBy('created_at', 'ASC')->get();
        return $users;
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreGestionRequest  $request
     * @return string
     */
    public function store(StoreGestionRequest $request)
    {
        $result = DB::table('gestions')->insert($request->all());
        if ($result){
            return response($result);
        }
    }
    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Gestion  $gestion
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Gestion $gestion)
    {
        $gestionresult = Gestion::find($gestion);
        if (is_null($gestionresult)) {
            return $this->sendError('gestion result not found.');
        }
        return response()->json([
            "success" => true,
            "message" => "Product retrieved successfully.",
            "data" => $gestionresult
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \App\Http\Requests\UpdateGestionRequest $request
     * @param \App\Models\Gestion $gestion
     * @return \Illuminate\Http\JsonResponse
     * @throws \Throwable
     */
    public function update(UpdateGestionRequest $request, Gestion $gestion)
    {
        $res = $gestion->updateOrFail($request->all());
        return response()->json(['message' => $res]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Gestion  $gestion
     * @return \Illuminate\Http\Response
     */
    public function destroy(Gestion $gestion)
    {
        $gestion->delete();
        return response();
    }

}
