<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Note;

class NotesController extends Controller
{
    /**
    * Display a listing of the resource.
    *
    * @return \Illuminate\Http\Response
    */
    public function index()
    {
        $notes = Note::all();
        
        return response()->json($notes);
    }

    /**
    * Store a newly created resource in storage.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return \Illuminate\Http\Response
    */
    public function store(Request $request)
    {
        $this->validate($request, array(
            'title'     => 'required',
            'content'   => 'required'
        ));

        $note = new Note;
        $note->title = $request->title;
        $note->content = $request->content;
        $note->save();

        return response()->json($note, 201);
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
        $note = Note::find($id)->update([
            'title'     => $request->get('title'),
            'content'   => $request->get('content')
        ]);
        
        return response()->json($note, 200);
    }

    /**
    * Remove the specified resource from storage.
    *
    * @param  int  $id
    * @return \Illuminate\Http\Response
    */
    public function destroy($id)
    {
        $note = Note::findOrFail($id);
        
        return response()->json(null, 204);
    }
}
