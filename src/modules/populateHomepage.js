
import { Store } from './store';

export class HomePage{
     createTodayContainer(){
          const todayContainer = document.createElement('div');
          todayContainer.classList.add('today-container');
          
          todayContainer.append(
               this.createTodayHeader(),
               this.createTodayList(),
          );

          return todayContainer;
     }

     createTodayHeader(){
          const todayHeader = document.createElement('div');
          todayHeader.classList.add('today-header');
          
          const todayHeaderTitle = document.createElement('h1');
          todayHeaderTitle.classList.add('today-header-title');
          todayHeaderTitle.textContent = 'Today';
          
          todayHeader.append(todayHeaderTitle);

          return todayHeader;
     }

     createTodayList(){
          const todayList = document.createElement('ul');
          todayList.classList.add('today-list');
          
          const todayTasks = Store.getToday();
          return todayList;
     }


     // Upcoming 
     createUpcomingContainer(){
          const upcomingContainer = document.createElement('div');
          upcomingContainer.classList.add('upcoming-container');
          
          upcomingContainer.append(
               this.createUpcomingHeader(),
               this.createUpcomingList(),
          );

          return upcomingContainer;
     }

     createUpcomingHeader(){
          const upcomingHeader = document.createElement('div');
          upcomingHeader.classList.add('upcoming-header');
          
          const upcomingHeaderTitle = document.createElement('h1');
          upcomingHeaderTitle.textContent = 'Upcoming';
          upcomingHeaderTitle.classList.add('upcomingHeaderTitle');
          
          upcomingHeader.append(upcomingHeaderTitle);
     
          return upcomingHeader;
     }

     createUpcomingList(){
          const upcomingList = document.createElement('ul');
          upcomingList.classList.add('upcoming-list');

          const upcomingTasks = Store.getUpcoming();

          upcomingTasks.forEach( task => {
               const li = document.createElement('li');
               li.textContent = task.title;
               upcomingList.append(li);
          });
        
          return upcomingList;
     }

     createAddTaskButton(){
          const addTaskButtonContainer = document.createElement('div');
          addTaskButtonContainer.classList.add('home-add-task-button-container');

          const addTaskButton = document.createElement('button');
          addTaskButton.classList.add('home-add-task-button');
          addTaskButton.textContent = '+ Add Task';

          addTaskButtonContainer.append(addTaskButton);

          addTaskButton.addEventListener('click', () => this.handleAddTask());
          return addTaskButtonContainer;
     }

     render(){
          const homePageParent = document.createElement('div');
          homePageParent.classList.add('home-page-parent');

          homePageParent.append(this.createTodayContainer(), this.createUpcomingContainer(), this.createAddTaskButton());
          return homePageParent;

     }
}