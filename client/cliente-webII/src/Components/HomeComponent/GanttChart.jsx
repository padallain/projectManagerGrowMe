// GanttChart.js
import React from 'react';
import { GanttComponent, Inject, Edit, Toolbar, Selection, ColumnDirective, ColumnsDirective } from '@syncfusion/ej2-react-gantt';

function GanttChart() {
    let data = [
        {
            TaskID: 'T1',
            TaskName: 'Project Initiation',
            StartDate: new Date('04/02/2019'),
            EndDate: new Date('04/21/2019'),
            subtasks: [
                { TaskID: 'T1.1', TaskName: 'Identify Site location', StartDate: new Date('04/02/2019'), Duration: 4, Progress: 50, Predecessor: '' },
                { TaskID: 'T1.2', TaskName: 'Perform Soil test', StartDate: new Date('04/02/2019'), Duration: 4, Progress: 50, Predecessor: 'T1.1FS' },
                { TaskID: 'T1.3', TaskName: 'Soil test approval', StartDate: new Date('04/02/2019'), Duration: 4, Progress: 50, Predecessor: 'T1.2FS' },
            ]
        },
        {
            TaskID: 'T2',
            TaskName: 'Project Estimation',
            StartDate: new Date('04/02/2019'),
            EndDate: new Date('04/21/2019'),
            subtasks: [
                { TaskID: 'T2.1', TaskName: 'Develop floor plan for estimation', StartDate: new Date('04/04/2019'), Duration: 3, Progress: 50, Predecessor: '' },
                { TaskID: 'T2.2', TaskName: 'List materials', StartDate: new Date('04/04/2019'), Duration: 3, Progress: 50, Predecessor: 'T2.1FS' },
                { TaskID: 'T2.3', TaskName: 'Estimation approval', StartDate: new Date('04/04/2019'), Duration: 3, Progress: 50, Predecessor: 'T2.2FS' }
            ]
        }
    ];

    const taskSettings = {
        id: 'TaskID',
        name: 'TaskName',
        startDate: 'StartDate',
        endDate: 'EndDate',
        duration: 'Duration',
        progress: 'Progress',
        dependency: 'Predecessor',
        child: 'subtasks'
    };

    const editSettings = {
        allowAdding: true,
        allowEditing: true,
        allowDeleting: true,
        allowTaskbarEditing: true,
        mode: 'Cell'
    };

    const toolbarSettings = ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll'];

    const handleActionComplete = (args) => {
        console.log('Action Complete', args);
    };

    const handleActionFailure = (args) => {
        console.error('Action Failure', args);
    };

    return (
        <div style={{ height: '400px', width: '100%', overflowX: 'auto' }}>
            <GanttComponent
                dataSource={data}
                taskFields={taskSettings}
                treeColumnIndex={1}
                allowRowDragAndDrop={true}
                editSettings={editSettings}
                toolbar={toolbarSettings}
                height="100%"
                width="100%"
                actionComplete={handleActionComplete}
                actionFailure={handleActionFailure}
            >
                <ColumnsDirective>
                    <ColumnDirective field='TaskID' visible={false} />
                    <ColumnDirective field='TaskName' headerText='Task Name' width='250' />
                    <ColumnDirective field='StartDate' headerText='Start Date' />
                    <ColumnDirective field='EndDate' headerText='End Date' />
                    <ColumnDirective field='Duration' headerText='Duration' />
                    <ColumnDirective field='Progress' headerText='Progress' editType='numericedit' />
                    <ColumnDirective field='Predecessor' headerText='Predecessor' editType='stringedit' />
                </ColumnsDirective>
                <Inject services={[Edit, Toolbar, Selection]} />
            </GanttComponent>
        </div>
    );
}

export default GanttChart;
