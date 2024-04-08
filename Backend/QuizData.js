const QuizArr = [
  {
    Question: " Which of the following command is used to install the Node.js express module?",
    Options: ["$ npm install express","$ node install express","$ install express","None of the Above"],
  },
  {
    Question: "What is Callback?",
    Options: ["The callback is a technique in which a method calls back the caller method.","The callback is an asynchronous equivalent for a function.","Both of the Above","None of the Above"],
 
  },
  {
    Question: "Which of the following extension is used to save the Node.js files?",
    Options: [".xml",".js",".node",".nd"],
    
  },
  {
    Question: "The Node.js modules can be exposed using:",
    Options: ["expose","import","export","None of the Above"],
    
  },
  {
    Question: "Which of the following module is not a built-in node module?",
    Options: ["zlib","https","dgram","fsread"],
    
  },
  {
    Question: "Which of the following method of fs module is used to get file information?",
    Options: ["fs.open(path, flags[, mode], callback)","fs.stat(path, callback)","fs.readFile(path, flags[, mode], callback)","None of the Above"],
    
  },
  {
    Question: "What does the fs module stand for?",
    Options: ["File Service","File System","File Store","File Sharing"],
    
  },
  {
    Question: "Which of the following code print the platform of operating system?",
    Options: ["console.log('platform : ' + os.platform);","console.log('platform : ' + os.platform());","console.log('platform : ' + os.getPlatform());","None of the Above"],
    
  },
  {
    Question: "What is the default scope in the Node.js application?",
    Options: ["Global","Local","Block","None of the Above"],
    
  },
  {
    Question: "Which of the following engine Node in core?",
    Options: ["Chrome V8","Chakra","Spider Monkey","None of the Above"],
    
  },
];

const Answers=["A","B","B","C","D","C","B","B","B","A"]
module.exports={QuizArr,Answers}