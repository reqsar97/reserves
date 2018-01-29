<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Reserve;

class ReserveController extends Controller
{
    //
    public function store(Request $request)
    {

        # code...
        return response()->json($request);
    }
}
