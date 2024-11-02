export interface Shift {
    date: string;
    shift: string;
    start: string | null;
    end: string | null;
}

export interface StaffSchedule {
    month: string;
    staffMember: string;
    shifts: Shift[];
}