import { Component } from '@angular/core';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  tasks: Task[] = [];
  taskData: Task = { title: '', description: '', completed: false };
  isEditing = false;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe((data) => {
      this.tasks = data;
    });
  }

  addTask(): void {
    this.taskService.createTask(this.taskData).subscribe((newTask) => {
      this.tasks.push(newTask);
      this.resetForm();
    });
  }

  editTask(task: Task): void {
    this.taskData = { ...task };
    this.isEditing = true;
  }

  updateTask(): void {
    if (this.taskData.id) {
      this.taskService.updateTask(this.taskData.id, this.taskData).subscribe(() => {
        // Recargar la lista de tareas después de actualizar
        this.loadTasks();
        this.resetForm();
      });
    }
  }
  
  
  

  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter((task) => task.id !== id);
    });
  }

  resetForm(): void {
    this.taskData = { title: '', description: '', completed: false };
    this.isEditing = false;
  }
}
