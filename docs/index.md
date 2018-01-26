__DOCCHAIN__

DocChain is a project build by Deakin University students as a proof of concept that Blockchain can be used for the purposes of Document Integrity and secured versioning.

It connects with different cloud storage providers like Google Drive and Box.
DocChain is a a file storage medium, capable of tracking, documenting and retaining the integrity of files and actions performed on them, with the reliability of blockchain technology.

Currently your Google Drive and Box.com files can be used, with plans to broaden file storage services in the future.

__Getting Started__
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

__Prequisites__

	1. Visual Studio Community '17
		i. https://www.visualstudio.com/thank-you-downloading-visual-studio/?sku=Community&rel=15
		ii. install as you would any program
	2. NodeJS
		i. https://nodejs.org/dist/v8.9.4/node-v8.9.4-x64.msi
		ii. run the .msi
	3. MySQL Server (App will run without a MySQL server setup however file action tracking won't be functional)
		i. https://dev.mysql.com/downloads/installer/
		ii. Run the installer and follow the setup wizard
	
__Installing__
A step-by-step guide of examples that will get your development environment running. __*There are steps missing due to security concerns.*__

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
	x. Select and drop-down the Dependencies    
	xi. Select and drop-down npm  
	xii. Ensure there are no warning yellow-triangle icons present on the icons of each npm package  
	xiii. if there are, select, right-click and update these packages, to do this for all packages at once right-click npm and update all packages  
	
	
	4. Intialising the Database  
	i. Download and install MySQL Server and MySQL workbench from https://dev.mysql.com/downloads/installer/
	ii. Follow the setup wizard. Ensure your server username and password match those specified within the application.
	iii. In MySQL workbench add a new schema to the server named "docchain"
	iv. Open and run the script docchain-db-setup.sql, found within the Database\scripts subdirectory.
	v. After setting up for the first time with the above steps, updates to the database can be applied by first running docchain-db-teardown.sql script, then running the new docchain-db-setup.sql script.

	
__Built With__

The core technologies used to build the project.

	1. ReactJS
	2. ASP.NET
	3. NodeJS
	4. Webpack
	5. MySQL

__Authors__

- [Monty Panday](https://github.com/montypanday): Chief Programmer, Project Lead 			
- [Mathew Smith](https://github.com/smmath): Programmer, Database Integrations		
- [Patrick Mitchell](https://github.com/pgmitche): Programmer, UX & UI Designer		
- [Roy Lou](https://github.com/LGNRoy): Programmer									
- Anushi Jayawardana: Security Analysis and Documentation
	
__Acknowledgments__  
Individuals of note and projects we pilfered.

	1. Leonard Hoon: Guidance, advice and supervision

These already come with the project but deserve mentioning for heavily augmenting the UX  
	- [Toastify](https://www.npmjs.com/package/react-toastify): for handling in-app alerts and notifications  
	- [React-file-viewer](https://www.npmjs.com/package/react-file-viewer): for handling in-app file previews  
	- [Bootstrap](https://www.npmjs.com/package/react-bootstrap): for some design assistance  
	- [FontAwesome](https://www.npmjs.com/package/font-awesome): for providing some icons  
	- [React-dropzone](https://www.npmjs.com/package/react-dropzone): for handling drag-drop uploads  

__END__ 
