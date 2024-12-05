import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import Job from "../job.model";
import { environment } from "../../../environments/environment.development";

@Injectable({
    providedIn: 'root'
})

export class JobListService {
    private apiUrl = '/api/v1/feed/';
    private apiKey = environment.apiKey

    // Job State
    jobs = signal<Job[]>([]);
    loading = signal<boolean>(true);
    error = signal<string | null>(null);

    constructor(private http: HttpClient) {}

    fetchJobs(): void {
        this.loading.set(true);

        // Auth Header
        const options = {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${this.apiKey}`
            })
        } 

        this.http.get<any>(this.apiUrl, options).subscribe({
            next: (data) => {
                let feedItems: any[] = data.items;
                let feedEntry: Job[] = feedItems.map((item) => (
                    {
                        'jobTitle' : item.title, 
                        'companyName': item._feed_entry.businessName, 
                        'jobLocation': item._feed_entry.municipal, 
                        'shortDescription': 'Job Description'
                    }
                ))
                this.jobs.set(feedEntry);
                this.loading.set(false);
            },
            error: (error) => {
                this.error.set('Failed to load job list')
                this.loading.set(false);
                console.log(error);
            }
        });
    }

    getJobs(): Job[] {
        return this.jobs();
    }

    getError(): string | null {
        return this.error();
    }

    isLoading(): boolean {
        return this.loading();
    }

}