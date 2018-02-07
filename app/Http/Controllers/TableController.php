<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Table;
use App\Events\TableOpenEvent;

class TableController extends Controller
{
    public function tableOpen($area, $table)
    {
        $table = Table::where('area',$area)
        	->where('number',$table)
        	->get()
        	->first();
        if($table->is_open==0){
        	$table->is_open = 1;
        }else{
        	$table->is_open = 0;
        }
        $table->save();

        event(new TableOpenEvent($table));

        return response()->json($table);

    }
}
