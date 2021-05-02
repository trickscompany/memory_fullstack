<?php
namespace Controllers;

class ApplicationController extends Controller
{
    public function index()
    {
        $this->render('hello', [], 'default');
    }
}