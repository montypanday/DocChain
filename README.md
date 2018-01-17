--DOCCHAIN--
*-----------*

DocChain is a a file storage medium, capable of tracking, documenting and retaining the integrity of files and actions performed on them, with the reliability of blockchain technology.

Currently your Google Drive and Box.com files can be used, with plans to broaden file storage services in the future.

--Getting Started--
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

--Prequisites--
What things you need to install and how to install them.

	1. Visual Studio Community '17
		i.
	2. NodeJS
		i.

	
		
--Installing--
A step-by-step guide of examples that will get your development environment running

((BEAR IN MIND THINGS WE CANNOT INCLUDE FOR SECURITY PURPOSES))

//Say what the step is//

	//Provide the example//
	
	REPEAT
	
	1. Gathering all the required files.
		i. Navigate to the Clone or Download button on the GitHub repo, and selection an option.
		ii. Download the required >>dist<< folder _here_ which you will need to move to the project wwwroot folder
		iii. Download the provided loading animation _here_ which you will need to move to the dist folder 
	2. Starting the project.
		i. Start Visual Studio 2017
		ii. Open a project
		iii. Navigate to the downloaded project files you collected in step 1i. 
		iv. Select the front_end.sln and open it.
	3. Project set-up
		i. Navigate to the Solution Explorer in Visual studio
		ii. Select the front_end project and right click it
		iii. Open the properties panel
		iv. Select the Debug tab on the left hand side of the Properties panel
		v. The settings should be as so, ignore those that are not mentioned:
			Profile: IIS Express
			Launch: IIS Express
			Launch Browser[checked]: https://localhost:44374/
			App URL: https://localhost:44374/
			IIS Express Bitness: Default
			Enable SSL[checked]: https://localhost:44374/
			Enable Anonymous Authentication[checked]
			Enable Windows Authentication[unchecked]
		vi. Navigate to the TypeScript Build tab as in step 3iv.
		vii. Ensure TypeScript Version 2.6 is selected.
		viii. Complete the steps mentioned above in 1ii, and 1iii.
		ix. Navigate to the Solution Explorer
		x. Select and drop-down the Dependencies,
		xi. Select and drop-down npm
		xii. Ensure there are no warning yellow-triangle icons present on the icons of each npm package
		xiii. if there are, select, right-click and update these packages, to do this for all packages at once right-click npm and update all packages
	4. Intialising the Database
		i.
	
--Built With--
The core technologies used to build the project.

	1. ReactJS
	2. ASP.NET
	3. NodeJS(?)
	4. SQL Server thingy(?)

--Authors--
((THESE SHOULD LINK TO GITHUB ACCOUNTS))
	- Monty Panday: Chief Programmer, Project Lead
	- Matthew Smith: Programmer, Database Integrations
	- Patrick Mitchell: Programmer, UX & UI Designer
	- Roy Lou: Programmer
	- Anushi Jayawardana: Security Analysis and Documentation
	
--Acknowledgments--
Individuals of note and projects we pilfered.

	- Leonard Hoon: Guidance, advice and supervision
	
	- Toastify
	- React-file-viewer
	- blah blah
	
	
----- END -----	