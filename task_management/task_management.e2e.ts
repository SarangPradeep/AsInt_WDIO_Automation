import taskManagementListView from '../page_object_model/btp_applications_page/task_management/task_management.listview.page.js';

describe('Task Management test', () => {

    it('should create a new task from task management list view', async function () {
        this.timeout(900000); // 15 minutes
        const taskDescription = `AUTO TASK ${Date.now()}`;
        const editedTaskDescription = `UPDATED AUTO TASK ${Date.now()}`;
        const updatedComment = `EDITED COMMENT ${Date.now()}`;

        await taskManagementListView.navigateToTaskManagementListView();
        await taskManagementListView.createTask(taskDescription, {
            activity: 'Asset Inspection',
            priority: 'Low',
            assignedTo: 'anmol.kumar@asint.net',
            objectType: 'None'
        });
        await taskManagementListView.verifyTaskCreated(taskDescription);
        await taskManagementListView.openTaskDetail(taskDescription);
        await taskManagementListView.editHeaderDetails(
            `Updated Header ${Date.now()}`,
            `Updated Long Description ${Date.now()}`
        );
        await taskManagementListView.editTaskAndSave({
            description: editedTaskDescription,
            activity: 'Asset Inspection',
            priority: 'Low',
            assignedTo: 'anmol.kumar@asint.net',
            comment: updatedComment
        });
        await taskManagementListView.updateStatusToCompleted();
        await taskManagementListView.deleteTaskAndConfirm();
        await taskManagementListView.searchAndVerifyTaskDeleted(editedTaskDescription);
    });
}).timeout(900000);