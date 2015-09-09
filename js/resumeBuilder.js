//biography object
var skills = {
	"computer": [
		{
			"name": "HTML",
			"value": "90"
		},
		{
			"name": "CSS",
			"value": "80"
		},
		{
			"name": "jQuery",
			"value": "75"
		},
		{
			"name": "JavaScript",
			"value": "40"
		},
		{
			"name": "AngularJS",
			"value": "30"
		},
		{
			"name": "C#",
			"value": "60"
		},
		{
			"name": "JAVA",
			"value": "15"
		},
		{
			"name": "MVC",
			"value": "65"
		},
		{
			"name" : "SQL",
			"value" : "55"
		}
	]
};
var bio = {
	"name" : "Janice Uwujaren",
	"role" : "Web Developer",
	"contacts": {
		"mobile": "(470) 222-5120",
		"email": "juwujaren@outlook.com",
		"github": "chiqua25",
		"twitter": "@geekingcode",
		"location": "McDonough, Georgia",
		"linkedin": "www.linkedin.com/in/januwu"
	},
	"skills": skills,
	"WelcomeMessage": "elegant development for the modern web",
	"bioPic": "images/profilepic.jpg"
};

//header variables
var formattedName = HTMLheaderName.replace("%data%", bio.name);
var formattedRole = HTMLheaderRole.replace("%data%", bio.role);
var formattedWelcomeMessage = HTMLwelcomeMsg.replace("%data%", bio.WelcomeMessage);
$("#header").prepend(formattedRole).prepend(formattedName).prepend(formattedWelcomeMessage);
//pic and welcome message variables
var formattedBioPic = HTMLbioPic.replace("%data%", bio.bioPic);
$("#header").append(formattedBioPic);

//top contact info variables
var formattedMobile = HTMLmobile.replace("%data%", bio.contacts.mobile);
var formattedLocation = HTMLlocation.replace("%data%", bio.contacts.location);
var formattedTwitter = HTMLtwitter.replace("%data%", bio.contacts.twitter);
var formattedGithub = HTMLgithub.replace("%data%", bio.contacts.github);
var formattedLinkedIn = HTMLlinkedin.replace("%data%", bio.contacts.linkedin);
var formattedEmail = HTMLemail.replace("%data%", bio.contacts.email);
var contactInfo = formattedMobile + formattedEmail + formattedGithub + formattedLinkedIn + formattedTwitter + formattedLocation;
$("#topContacts").prepend(contactInfo);

//skills info
  if (bio.skills.computer.length > 0) {
    $('#header').append(HTMLskillsStart);

    for (var index in bio.skills.computer) {
      var formattedSkill = HTMLskills.replace("%data%", bio.skills.computer[index].name).replace("%value%", bio.skills.computer[index].value);
      $('#skills').append(formattedSkill);
    }
  };

//work experience variables
var work = {
	"jobs": [
		{
			"employer": "Computer Technology Solutions",
			"title": "Software Engineer",
			"location": "Atlanta, Georgia",
			"dates": "October 2012 to Present",
			"description": "Lead a team of software developers supporting the development of solutions for CTS consulting engagements."
		},
		{
			"employer": "CDC (SAIC/TekSystems)",
			"title": "SharePoint Developer",
			"location": "Atlanta, Georgia",
			"dates": "June 2012 to October 2012",
			"description": "Analyze requirements and recommend out of box or development approach based on requirements."
		},
		{
			"employer": "Pragmatics, Inc.",
			"title": "SharePoint Developer",
			"location": "Reston, Virginia",
			"dates": "February 2012 to June 2012",
			"description": "Oversaw the creation of new capabilities and maintenance for the Classroom XXI Program’s SharePoint site."
		},
		{
			"employer": "SRA International, Inc.",
			"title": "SharePoint Analyst",
			"location": "Fairfax, Virginia",
			"dates": "May 2010 to February 2012",
			"description": "Use SharePoint Designer, InfoPath, HTML, CSS, JavaScript, and jQuery to develop custom SharePoint solutions."
		}
	]
};

function displayWork() {
	for (job in work.jobs) {
		$("#work-container").append(HTMLworkStart);

		var formattedEmployer = HTMLworkEmployer.replace("%data%", work.jobs[job].employer);
		var formattedTitle = HTMLworkTitle.replace("%data%", work.jobs[job].title);
		var formattedLocation = HTMLworkLocation.replace("%data%", work.jobs[job].location);
		var formattedDates = HTMLworkDates.replace("%data%", work.jobs[job].dates);
		var formattedDescription = HTMLworkDescription.replace("%data%", work.jobs[job].description);
		var formattedEmployerTitle = formattedEmployer + formattedTitle + formattedLocation + formattedDates + formattedDescription;

		$(".work-entry:last").append(formattedEmployerTitle);
	}
};

displayWork();

//project experience variables
var projects = {
	"projects": [
		{
			"title" : "Portfolio",
			"dates" : "July 2015",
			"description" : "links to my portfolio projects",
			"image" : "images/portfolioimage.jpg"
		},
		{
			"title" : "Resume",
			"dates" : "August 2015",
			"description" : "interactive online resume",
			"image" : "images/resumeimage.jpg"
		},
		{
			"title" : "Arcade Game",
			"dates" : "September 2015",
			"description" : "recreate classic arcade game",
			"image" : "images/gameimage.jpg"
		},
		{
			"title" : "Website Optimization",
			"dates" : "September 2015",
			"description" : "improve performance of website",
			"image" : "images/performanceimage.jpg"
		},
		{
			"title" : "Neighborhood Map",
			"dates" : "October 2015",
			"description" : "single page app featuring map",
			"image" : "images/mapimage.jpg"
		},
		{
			"title" : "Feed Reader Testing",
			"dates" : "October 2015",
			"description" : "test app that reads RSS feeds.",
			"image" : "images/feederimage.jpg"
		}
	]
};

projects.display = function() {
	for (project in projects.projects) {
		$("#project-container").append(HTMLprojectStart);

		$(".project-entry:last").append(HTMLprojectSpan);

		var formattedTitle = HTMLprojectTitle.replace("%data%", projects.projects[project].title);
		$(".pic-caption:last").append(formattedTitle);

		var formattedDescription = HTMLprojectDescription.replace("%data%", projects.projects[project].description);
		$(".pic-caption:last").append(formattedDescription);

		var formattedDates = HTMLprojectDates.replace("%data%", projects.projects[project].dates);
		$(".pic-caption:last").append(formattedDates);

		var formattedImage = HTMLprojectImage.replace("%data%", projects.projects[project].image);
		$(".project-entry:last").append(formattedImage);
	}
};
projects.display();

//educational background variables
var education = {
	"schools": [
		{
			"name": "Georgia Institute of Technology",
			"location" : "Atlanta, Georgia, US",
			"degree": "Masters",
			"major": "Computer Science",
			"gradyear": "2017"
		},
		{
			"name": "Strayer University",
			"location" : "Alexandria, Virginia, US",
			"degree": "Bachelor of Science",
			"major": "Computer Science",
			"gradyear": "2008"
		}
	],
"onlineCourses": [
		{
			"title": "Front-End Web Development",
			"school": "Udacity",
			"dates": "2015"
		},
		{
			"title": "WordPress BluePrint",
			"school": "SkillCrush",
			"dates": "2015"
		}
	]
}
$("#mapDiv").append(googleMap);

