/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"

// #import <GoogleSignIn/GoogleSignIn.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <FBSDKCoreKit/FBSDKCoreKit.h>
// #import <FBSDKLoginKit/FBSDKLoginKit.h>
// #import <RNGoogleSignin/RNGoogleSignin.h>
// #import "RNGoogleSignin.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"Salesfy"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];

  [[FBSDKApplicationDelegate sharedInstance] application:application
    didFinishLaunchingWithOptions:launchOptions];

     // [GIDSignIn sharedInstance].clientID = @"828352926635-66b7ilekn8mc24ho6v778hflnqu4tlqh.apps.googleusercontent.com";
     //  [GIDSignIn sharedInstance].delegate = self;
    
  return YES;
}

- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication
         annotation:(id)annotation {
  return [[FBSDKApplicationDelegate sharedInstance] application:application
                                                        openURL:url
                                              sourceApplication:sourceApplication
                                                     annotation:annotation];
}
/*

- (void)signIn:(GIDSignIn *)signIn
didSignInForUser:(GIDGoogleUser *)user
     withError:(NSError *)error {
  // Perform any operations on signed in user here.
  NSString *userId = user.userID;                  // For client-side use only!
  NSString *idToken = user.authentication.idToken; // Safe to send to the server
  NSString *fullName = user.profile.name;
  NSString *givenName = user.profile.givenName;
  NSString *familyName = user.profile.familyName;
  NSString *email = user.profile.email;
  // ...
}


- (void)signIn:(GIDSignIn *)signIn
didDisconnectWithUser:(GIDGoogleUser *)user
     withError:(NSError *)error {
  // Perform any operations when the user disconnects from app here.
  // ...
}
 */
@end
