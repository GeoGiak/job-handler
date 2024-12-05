import { Component, effect, OnInit, signal } from "@angular/core";
import { JobListService } from "./job-list.service";
import { CommonModule } from "@angular/common";
import Job from "../job.model";
import { JobCardComponent } from "./job-card.component";

@Component({
    selector: 'job-list',
    templateUrl: './job-list.component.html',
    styleUrl: './job-list.component.css',
    imports: [CommonModule, JobCardComponent]
})

export class JobListComponent  {

    rowsPerPage: number = 50;
    currentPage = signal<number>(1);
    totalPages = signal<number>(0);
    paginatedJobs = signal<Job[]>([])

    constructor(public jobService: JobListService) {
        effect(() => {
            const jobs = this.jobService.jobs();
            if (jobs.length > 0) {
                const totalJobs = this.jobService.jobs().length
                this.totalPages.set(Math.ceil(totalJobs / this.rowsPerPage))
                this.updatePage();
            }
        })
    }

    ngOnInit() {
        this.jobService.fetchJobs();
    }

    updatePage() {
        const startIndex = (this.currentPage() - 1) * this.rowsPerPage;
        return this.paginatedJobs.set(this.jobService.jobs().slice(startIndex, startIndex + this.rowsPerPage));
    }

    nextPage() {
        if (this.currentPage() < this.totalPages()) {
            this.currentPage.update(page => {return page + 1})
            this.updatePage();
        }
    }

    previousPage() {
        if (this.currentPage() > 1) {
            this.currentPage.update(page => {return page - 1})
            this.updatePage();
        }
    }

    goToPage(page: number) {
    if (page > 0 && page <= this.totalPages()) {
      this.currentPage.set(page);
      this.updatePage();
    }
  }
}