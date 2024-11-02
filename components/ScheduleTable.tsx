import { StaffSchedule } from '@/lib/types'
import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'

interface ScheduleTableProps {
    schedule: StaffSchedule
}

export const ScheduleTable: React.FC<ScheduleTableProps> = ({ schedule }) => {
    return (
        <div className="space-y-4">
            <div className="bg-white rounded-lg shadow p-4">
                <h3 className="text-lg font-semibold mb-4">
                    Schedule for {schedule.staffMember} - {schedule.month}
                </h3>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Shift</TableHead>
                                <TableHead>Start</TableHead>
                                <TableHead>End</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {schedule.shifts.map((shift) => (
                                <TableRow key={shift.date}>
                                    <TableCell>{shift.date}</TableCell>
                                    <TableCell>{shift.shift}</TableCell>
                                    <TableCell>{shift.start || '-'}</TableCell>
                                    <TableCell>{shift.end || '-'}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}
