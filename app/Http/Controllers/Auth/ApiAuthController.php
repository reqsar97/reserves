<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use JWTAuth;
use JWTAuthException;
use App\User;

class ApiAuthController extends Controller
{
    public function __construct()
    {
        $this->user = new User;
    }

    public function login(Request $request){

        $credentials = $request->only('email', 'password');

        $jwt = '';

        try {
            if (!$jwt = JWTAuth::attempt($credentials)) {
                return response()->json([
                    'response' => 'error',
                    'message' => 'invalid_credentials',
                ], 401);
            }
        } catch (JWTAuthException $e) {
            return response()->json([
                'response' => 'error',
                'message' => 'failed_to_create_token',
            ], 500);
        }
        return response()->json([
            'response' => 'success',
            'result' => ['token' => $jwt]
        ]);
    }

    public function logout()
    {
        try {
            JWTAuth::invalidate(JWTAuth::getToken());
            return response()->json(['success' => true, 'message' => 'Logout successful'], 200);
        } catch (JWTException $e) {
            return response()->json(['success' => false, 'error' => 'Failed to logout, please try again.'], 500);
        }
    }

    public function getAuthUser(Request $request){
        // JWTAuth::setToken($request->input('token'));
        // $user = JWTAuth::toUser();
        return response()->json(['result' => auth()->user()]);
    }

}
