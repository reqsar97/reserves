<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Reserve;
use Carbon\Carbon;
use App\Events\NewReserveAdded;
use App\Events\ReserveArrived;
use App\Events\ReserveCancelled;
use App\Events\ReserveUpdateEvent;

class ReserveController extends Controller
{
    //
    public function store(Request $request)
    {
        $reserve = auth()->user()->reserves()->create([
            'name'=>$request['name'],
            'count'=>$request['count'],
            'time'=>$request['date-time-picker'],
            'phone'=>$request['phone'],
            'area'=>$request['area'],
            'table'=>$request['table'],
            'is_arrived' => 0
        ]);
        event(new NewReserveAdded($reserve));
        return response()->json(['status'=>'success', 'data'=>$reserve],200);
    }

    public function reserveArrived(Reserve $reserve)
    {
        if($reserve->is_arrived==1){
            $reserve->is_arrived=0;
        }else{
            $reserve->is_arrived = 1;
        }
        $reserve->save();
        event(new ReserveArrived($reserve));
        return response()->json($reserve);
    }

    public function reserveCancel($id)
    {
        // $reserve->delete();
        $reserve = Reserve::destroy($id);
        event(new ReserveCancelled($id));
        return response()->json(['status' => 'success', 'data'=>$id], 200);
    }

    public function getTodayReservesByArea($area)
    {
        $today = Carbon::today()->toDateTimeString();
        $tomorrow = Carbon::tomorrow()->toDateTimeString();
        $todayReserves = Reserve::where('area','=',$area)
            ->where('time','>=',$today)
            ->where('time','<=',$tomorrow)            
            ->with('user')
            ->get();
        return response()->json(['status'=>'success', 'data'=>$todayReserves]);
    }

    public function getById($id)
    {
        $reserve = Reserve::find($id);

        return response()->json(['status'=> 'success', 'data'=>$reserve]);
    }

    public function update(Reserve $reserve, Request $request)
    {
        $reserve->update([
            'name'=>$request['name'],
            'count'=>$request['count'],
            'time'=>$request['date-time-picker'],
            'phone'=>$request['phone'],
            'area'=>$request['area'],
            'table'=>$request['table'],
            'is_arrived' => 0
        ]);
            
        event(new ReserveUpdateEvent($reserve));
        return response()->json(['status'=>'success']);
    }

}
