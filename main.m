//
//  main.m
//  dump-for-dd
//
//  Created by monmon on 10/11/11.
//  Copyright __MyCompanyName__ 2010. All rights reserved.
//

#import <UIKit/UIKit.h>

int main(int argc, char *argv[]) {
    
    NSAutoreleasePool * pool = [[NSAutoreleasePool alloc] init];
    int retVal = UIApplicationMain(argc, argv, nil, @"dump_for_ddAppDelegate");
    [pool release];
    return retVal;
}
