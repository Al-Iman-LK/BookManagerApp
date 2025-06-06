import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('donutChart', { static: false }) donutChart!: ElementRef<HTMLCanvasElement>;
  
  books: Book[] = [];
  latestBooks: Book[] = [];
  oldestBooks: Book[] = [];
  authorStats: { [key: string]: number } = {};
  chart: Chart | null = null;
  Object = Object; // Make Object available in template

  constructor(private bookService: BookService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.loadBooks();
  }

  ngAfterViewInit(): void {
    // Chart will be created after books are loaded
  }

  loadBooks(): void {
    this.bookService.getBooks().subscribe({
      next: (books) => {
        this.books = books;
        this.processBookData();
        this.createDonutChart();
      },
      error: (error) => {
        console.error('Error loading books:', error);
      }
    });
  }

  processBookData(): void {
    // Sort books by ID for latest (highest ID = latest)
    const sortedByIdDesc = [...this.books].sort((a, b) => b.id - a.id);
    this.latestBooks = sortedByIdDesc.slice(0, 5);

    // Sort books by publication date for oldest
    const sortedByDateAsc = [...this.books].sort((a, b) => 
      new Date(a.publicationDate).getTime() - new Date(b.publicationDate).getTime()
    );
    this.oldestBooks = sortedByDateAsc.slice(0, 10);

    // Count books by author
    this.authorStats = {};
    this.books.forEach(book => {
      this.authorStats[book.author] = (this.authorStats[book.author] || 0) + 1;
    });
  }

  createDonutChart(): void {
    if (this.donutChart && Object.keys(this.authorStats).length > 0) {
      const ctx = this.donutChart.nativeElement.getContext('2d');
      
      if (ctx) {
        // Destroy existing chart if it exists
        if (this.chart) {
          this.chart.destroy();
        }

        const authors = Object.keys(this.authorStats);
        const counts = Object.values(this.authorStats);
        
        const config: ChartConfiguration = {
          type: 'doughnut',
          data: {
            labels: authors,
            datasets: [{
              data: counts,
              backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#4BC0C0',
                '#9966FF',
                '#FF9F40',
                '#FF6384',
                '#C9CBCF'
              ],
              borderWidth: 2,
              borderColor: '#fff'
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'bottom',
                labels: {
                  padding: 20,
                  usePointStyle: true
                }
              },
              title: {
                display: true,
                text: 'Books by Author',
                font: {
                  size: 16,
                  weight: 'bold'
                }
              }
            }
          }
        };

        this.chart = new Chart(ctx, config);
      }
    }
  }  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }
}
