# todo_list_with_form
A to do list page with a form to add &amp;  modify
Each task dom has a texte, an alter button and a del button.
first checks tasks in a Json stored in the local storage
builds tasks dom if Json datas

validate function :
  checks the string input pattern,
  if error, an error message apears under the input,
  else the comitEntry is called.

commitEntry function:
  ckecks if a to do id exists,
  if true launches the modifyTask function,
  else launches the addTask function,
  In all cases regsiter function is called
  
addTask function:
  gets a new id from the tasks lists,
  adds a new task object in the list with id and text,
  launches the dom building function,
  
modifyTask function:
  modify task in the list with the modifyInArray function,
  modify dom task text with the modifyElements function,
  
  
modifyElements function:
  modify some dom elements according to events.
    On a task's alter button, button called "modifier".
    On a modify task action from main form.
    
delButtonAction function:
  is an event function binded to a task del button.
  deletes in the task list with deleteInArray
  remove the task dom with removeElements function
  then launches the register function
