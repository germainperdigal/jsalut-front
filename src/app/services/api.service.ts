import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/** Models */
import { User } from 'src/app/models/user.model';
import { Observable } from 'rxjs';
import { Showcase } from 'src/app/models/showcase.model';
import { Partner } from 'src/app/models/partner.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = 'http://localhost:3000';

  constructor(
    private readonly httpClient: HttpClient,
  ) { }

  /**
   * Show case
   *
   * @param onlyHeader Only header
   */
  showCase(onlyHeader?: boolean): Observable<Showcase> {
    return this.httpClient.get<Showcase>(`${this.apiUrl}/showcase${onlyHeader ? '/header' : ''}`);
  }

  /** Create edition */
  createEdition(edition: any): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/editions`, edition);
  }

  /** Get user */
  getUser(id?: string): Observable<User> {
    let url = `${this.apiUrl}/users/details`;

    if (id) {
      url = `${url}/${id}`;
    }

    return this.httpClient.get<User>(url);
  }

  /** Get edition */
  getEdition(id: string): Observable<User> {
    let url = `${this.apiUrl}/editions/view/${id}`;

    return this.httpClient.get<any>(url);
  }

  /** Update edition */
  updateEdition(editionId: string, year: number, edition: any, pics: Array<File>): Observable<User> {
    let url = `${this.apiUrl}/editions/${year}/${editionId}`;
    let formData:FormData = new FormData();

    if (pics) {
      pics.forEach((file: File, index: number) => {
        formData.append('pictures[]', file, file.name);
      });
    }

    formData.append('edition', JSON.stringify(edition));

    return this.httpClient.patch<User>(url, formData);
  }

  /** Get user */
  updateUser(user: User, id?: string): Observable<User> {
    let url = `${this.apiUrl}/users`;

    if (id) {
      url = `${url}/${id}`;
    }

    return this.httpClient.patch<User>(url, user);
  }

  /** Get editions */
  getEditions(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/editions`);
  }

  /** Get committees */
  getCommittees(): Observable<User> {
    return this.httpClient.get<User>(`${this.apiUrl}/committee/committee`);
  }

  /** Get committees */
  getCommitteesMembers(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/committee/committee-members`);
  }

  /** Create committee */
  createCommittee(committee: any): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/committee/committee`, committee);
  }

  /** Update committee */
  updateCommittee(committee: any): Observable<any> {
    return this.httpClient.patch<any>(`${this.apiUrl}/committee/committee/${committee._id}`, committee);
  }

  /** Create committee member */
  createCommitteeMember(committeeMember: any, profilePic: File): Observable<any> {
    let formData:FormData = new FormData();
    formData.append('profilePic', profilePic, profilePic.name);
    formData.append('committeeMember', JSON.stringify(committeeMember));

    let headers = new Headers();
    headers.append('Content-Type', 'multipart/form-data');

    return this.httpClient.post<any>(`${this.apiUrl}/committee/committee-member`, formData);
  }

  /** Update committee member */
  updateCommitteeMember(committeeMember: any): Observable<any> {
    return this.httpClient.patch<any>(`${this.apiUrl}/committee/committee-member/${committeeMember._id}`, committeeMember);
  }

  /** List all editions */
  listAllEditions(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/editions/list`);
  }

  /** List all editions */
  listAllUsers(): Observable<User> {
    return this.httpClient.get<User>(`${this.apiUrl}/users/list`);
  }

  /** Get current edition */
  getCurrentEdition(): Observable<User> {
    return this.httpClient.get<User>(`${this.apiUrl}/editions/current`);
  }

  /**
   * Sign up user
   *
   * @param user The user to sign
   */
  signUpUser(user: User, admin?: boolean): Observable<User> {
    let url = `${this.apiUrl}/users`;

    if (admin) {
      url = url+'?key=9d34852d72f6ba9bdd7b5e9ce51292ef4a9cabeb452aa51b26cd072a05b70290';
    }

    return this.httpClient.post<User>(url, {...user});
  }

  /**
   * Log user
   *
   * @param emailAddress  The email address
   * @param password      The password
   */
  logUser(emailAddress?: string, password?: string): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/users/login`, {emailAddress, password});
  }

  listApplications(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/applications/list`);
  }

  /**
   * Update application
   *
   * @param playerInfos   The player infos
   * @param applicationId The application id
   */
  updateApplication(playerInfos: any, applicationId: string): Observable<any> {
    return this.httpClient.patch<any>(`${this.apiUrl}/applications/${applicationId}`, playerInfos)
  }

  /**
   * Apply
   *
   * @param playerInfos The player infos
   */
  apply(playerInfos: any): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/applications/apply`, playerInfos)
  }

  addFilesToApplication(files: {sportCv: File|null, pics: Array<File>|null, video: File|null}, application: any, year: any): Observable<any> {
    let formData:FormData = new FormData();

    if (files['sportCv']) {
      formData.append('documents[]', files['sportCv'], `sportCv.${files['sportCv']?.name.split('.')[1]}`)
    }
    if (files['pics'] !== null) {
      for (let i = 0; i < files['pics']?.length; i++) {
        formData.append('documents[]', files['pics'][i], `pic-${i+1}.${files['pics'][i]?.name.split('.')[files['pics'][i]?.name.split('.').length-1]}`);
      }
    }

    if (files['video']) {
      formData.append('documents[]', files['video'], `video.${files['video']?.name.split('.')[files['video']?.name.split('.').length-1]}`)
    }
    console.log(formData)

    let headers = new Headers();
    headers.append('Content-Type', 'multipart/form-data');

    return this.httpClient.post<any>(`${this.apiUrl}/applications/upload/${year}/${application._id}`, formData);
  }

  /**
   * Update showcase
   *
   * @param showCase The showcase object
   */
  updateShowCase(showCase: Showcase): Observable<Showcase> {
    return this.httpClient.patch<Showcase>(`${this.apiUrl}/showcase`, showCase);
  }

  /**
   * Create communication
   *
   * @param communication The communication
   */
  createCommunication(communication: any): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/messages`, communication);
  }

  /**
   * Delete communication
   *
   * @param communicationId The communication id
   */
  deleteCommunication(communicationId: any): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiUrl}/messages/${communicationId}`);
  }

  getMessages(role: string): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/messages/${role}`);
  }

  /**
   * Create communication
   *
   * @param role The role
   */
  getCommunications(role: string): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/messages/${role}`);
  }

  getApplications(year: number): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/applications/overview/${year}`);
  }

  downloadApplications(year: number): Observable<any> {
    // @ts-ignore
    return this.httpClient.get<any>(`${this.apiUrl}/applications/overview/${year}?zip=true`, { responseType: 'blob', observe: 'response' });
  }

  downloadApplication(id: string): Observable<any> {
    // @ts-ignore
    return this.httpClient.get<any>(`${this.apiUrl}/applications/${id}?zip=true`, { responseType: 'blob', observe: 'response' });
  }

  getApplication(id: string): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/applications/${id}`);
  }

  noteApplication(id: string, note: any): Observable<any> {
    return this.httpClient.patch<any>(`${this.apiUrl}/applications/note/${id}`, note);
  }

  deleteFile(year: number, applicationId: string, file: string): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiUrl}/applications/${year}/${applicationId}/${file}`);
  }

  /** Get file */
  getFile(year: number, userId: string, file: string): Observable<any> {
    const options = file.includes('pics') ? { responseType: 'blob' as 'json', observe: 'response' } : null;

    // @ts-ignore
    return this.httpClient.get<any>(`${this.apiUrl}/applications/${year}/${userId}/${file}`, options);
  }

  /** Get partners */
  getPartners(): Observable<Array<Partner>> {
    return this.httpClient.get<Array<Partner>>(`${this.apiUrl}/partners`);
  }

  /** Get partner */
  getPartner(id: string): Observable<Partner> {
    return this.httpClient.get<Partner>(`${this.apiUrl}/partners/${id}`);
  }

  /** Get partner */
  getGallery(): Observable<any> {
    return this.httpClient.get<Partner>(`${this.apiUrl}/gallery`);
  }

  /** Create partner */
  createPartner(partner: Partner, logo: File, smallLogo?: File): Observable<Partner> {
    let formData:FormData = new FormData();
    const partnerName = partner.label.toLowerCase().replace(' ', '-');
    formData.append('logo', logo, logo.name);
    if (smallLogo) {
      formData.append('smallLogo', smallLogo, smallLogo.name);
    }
    formData.append('partner', JSON.stringify(partner));

    let headers = new Headers();
    headers.append('Content-Type', 'multipart/form-data');

    return this.httpClient.post<Partner>(`${this.apiUrl}/partners`, formData);
  }

  /** Delete partner */
  deletePartner(partner: Partner): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiUrl}/partners/${partner._id}`);
  }

  /** Delete partner */
  getEditionFiles(editionId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/editions/files/${editionId}`);
  }
}
