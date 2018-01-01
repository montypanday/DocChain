using Database.Services;
using Model;
using System;
using System.Collections.Generic;
using Dapper.Contrib.Extensions;

namespace Database
{
    class Program
    {
        static void Main(string[] args)
        {
            ConnectionProvider connection = new ConnectionProvider();

            TrackedFileService fileTracker = new TrackedFileService();

            if (fileTracker.TrackFile("testFile", "testPlatform"))
                System.Diagnostics.Debug.WriteLine("Tracked");
            else
                System.Diagnostics.Debug.WriteLine("Track Failed");

            if (fileTracker.CheckIfTracked("testFile", "testPlatform"))
                System.Diagnostics.Debug.WriteLine("File is tacked");
            else
                System.Diagnostics.Debug.WriteLine("File is not tracked or query failed");

            //if (fileTracker.UntrackFile("testFile", "testPlatform"))
            //    System.Diagnostics.Debug.WriteLine("Untracked");
            //else
            //    System.Diagnostics.Debug.WriteLine("Untrack Failed");

            Console.WriteLine("No good");
        }
    }
}
