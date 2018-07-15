# WallTap-VotingApp
Voting app using Firebase and React Native - Facebook, Twitter Authentication, Google Admob, In app purchase


Configure setup steps for iOS:

1: run npm install using terminal

2: run pod install in ios folder

3: Open xcode and modify something in Libraries/RCTFBLogin.xcodeproj

  1)RCTFBLogin.h
  
  Change #import <React/RCTView.h> to #import "RCTView.h"
  
  2)RCTFBLogin.m
  
  Change #import <React/RCTFBLogin.h> to #import "RCTFBLogin.h"
  
  Change #import <React/RCTlog.h> to #import "RCTlog.h"
  
  3)RCTFBLoginManager.h
  
  Change #import <React/RCTViewManager.h> to #import "RCTViewManager.h"
  
  4)RCTFBLoginManager.m
  
  Change #import <React/RCTBridge.h> to #import "RCTBridge.h"
  
  Change #import <React/RCTEventDispatcher.h> to #import "RCTEventDispatcher.h"
  
  Change #import <React/RCTlog.h> to #import "RCTlog.h"
  
  Change #import <React/RCTFBlogin.h> to #import "RCTFBlogin.h"
  
  Change #import <React/RCTFBLoginManager.h> to #import "RCTFBLoginManager.h"
    
4: Finally run react-native run-ios
