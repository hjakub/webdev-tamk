export default function InfoView() {
  return (
    <div className="view-card">
      <h2>App Information</h2>
      <p>Author: Jakub Hrabec</p>
      <p>Project: Task App</p>
      <p>
        Description: Application that allows users to manage and track tasks.
        Made as a final project for TAMK course Full Stack Web Development -
        frontend part.
      </p>
      <p>
        Instructions: The app contains 4 different views/pages, user can switch
        between them using the navbar.
        The first page is <b>Active Tasks and Timer</b>. Tapping the Add Task button will show a
        modal form which allows user to add a new task to the list. Underneath
        is a filter sections. Users can filter either using the textbox by
        typing name or description, or using the label dropdown. The list
        includes information about each task, as well as actions - start/pause,
        delete, or edit. The edit actions will open a modal form using which
        user can change information about selected task.
        The second page is <b>Activity History</b>. The page is currently under construction.
        The third page is <b>Analytics</b>. The page is currently under construction.
        The fourth and final page is <b>Info</b> page, which you are currently viewing.
      </p>
    </div>
  );
}
