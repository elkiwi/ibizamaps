@extends('layouts.app')

  @section('content')
    <h3>Pages</h3>

    @if(count($pages) > 0)
      @foreach($pages as $page)

        <div class="well">
          <h4>{{$page->name}}</h4>
        </div>

      @endforeach
    @endif
  @endsection