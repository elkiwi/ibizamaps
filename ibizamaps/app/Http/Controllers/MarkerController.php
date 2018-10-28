<?php

namespace App\Http\Controllers;
use App\Marker;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;

class MarkerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
			//$markers = Marker::all();
			//$markers = DB::table('users')->where('name', 'elkiwi')->first();
			//var_dump($user->name);
			// get towns
			$markers = DB::table('markers')
				->where('type', '13')
				->leftJoin('pages_en', 'id', '=', 'pages_en.idpage_en')
				->select('name_en','summary_en', 'id')
				->get();

			//var_dump($markers);

      return response()->Json($markers);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
     /*  $markers = Marker::find($id);
      return response()->Json($markers); */
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
