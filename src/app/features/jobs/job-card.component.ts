
import { Component, Input } from "@angular/core";
import Job from "../job.model";
import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { MatCardModule } from "@angular/material/card";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { MatButtonModule } from "@angular/material/button";

@Component({
    selector: 'job-card',
    templateUrl: './job-card.component.html',
    styleUrl: './job-card.component.css',
    imports: [CommonModule, MatCardModule, MatProgressSpinner, MatButtonModule]
}) 

export class JobCardComponent {
    @Input() job: Job | undefined;
    loading: boolean = false;

    applyNow() {
        this.loading = true;
        setTimeout(() => {
            this.loading = false;
            alert("Application submitted")
        }, 2000)
    }
}