<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Marker extends Model
{
    public function page()
    {
        return $this->hasOne('App\Page', 'idpage_en');
    }
}
