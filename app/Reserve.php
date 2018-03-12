<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Reserve extends Model
{
    protected $fillable = [
        'name', 'count', 'time', 'phone', 'area', 'table', 'user_id', 'is_arrived', 'info'
    ];

    public function user()
    {
        return $this->belongsTo('App\User');
    }

}
