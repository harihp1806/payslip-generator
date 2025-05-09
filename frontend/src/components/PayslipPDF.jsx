import React from 'react';
import jsPDF from 'jspdf';

function PayslipPDF({ payslipData, employee }) {
  const handleDownload = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    doc.setFontSize(16);
    doc.text('PAY SLIP', pageWidth / 2, 15, null, null, 'center');

    // Employee Info Box
    doc.setFontSize(12);
    doc.rect(20, 25, 170, 85); // Increased height to fit extra rows
    doc.text(`Name: ${payslipData.name}`, 25, 32);
    doc.text(`Employee ID: ${payslipData.employeeId}`, 25, 38);
    doc.text(`Designation: ${employee?.designation || 'N/A'}`, 25, 44);
    doc.text(`Month/Year: ${payslipData.month}/${payslipData.year}`, 25, 50);
    doc.text(`Present Days: ${payslipData.presentDays} / ${payslipData.workingDays}`, 120, 32);
    doc.text(`UAN: ${employee?.uan || 'N/A'}`, 120, 38);
    doc.text(`PAN: ${employee?.pan || 'N/A'}`, 120, 44);
    doc.text(`PF No.: ${employee?.pfNumber || 'N/A'}`, 120, 50);
    doc.text(`Bank A/C: ${employee?.bankAccountNumber || 'N/A'}`, 25, 56);
    doc.text(`IFSC: ${employee?.ifscCode || 'N/A'}`, 120, 56);
    doc.text(`Email: ${employee?.email || 'N/A'}`, 25, 62);
    doc.text(`Phone: ${employee?.phone || 'N/A'}`, 120, 62);
    doc.text(`Department: ${employee?.department || 'N/A'}`, 25, 68);
    // doc.text(`Joining Date: ${employee?.joiningDate ? new Date(employee.joiningDate).toLocaleDateString() : 'N/A'}`, 120, 68);

    // Section Title
    doc.setFontSize(14);
    doc.text('Earnings and Deductions', 20, 120);

    const breakdown = payslipData.salaryBreakdown;
    const earnings = [];
    const deductions = [];

    for (const [key, value] of Object.entries(breakdown)) {
      if (['epf', 'esi', 'tds', 'otherdeductions', 'totaldeductions'].includes(key.toLowerCase())) {
        deductions.push([key, value]);
      } else if (key.toLowerCase() !== 'netsalary') {
        earnings.push([key, value]);
      }
    }

    // Draw salary section box
    const startY = 125;
    const rowHeight = 8;
    const maxRows = Math.max(earnings.length, deductions.length);
    const tableHeight = rowHeight * maxRows + 10;
    doc.rect(20, startY, 170, tableHeight);

    // Vertical dotted line
    const midX = 105;
    for (let y = startY; y <= startY + tableHeight; y += 2) {
      doc.line(midX, y, midX, y + 1, 'S');
    }

    // Titles
    doc.setFontSize(12);
    doc.text('Earnings', 25, startY + 7);
    doc.text('Deductions', midX + 5, startY + 7);

    let currentY = startY + 15;
    for (let i = 0; i < maxRows; i++) {
      if (earnings[i]) {
        const [key, value] = earnings[i];
        doc.setFont('helvetica', 'normal');
        doc.text(`${key}: ₹${value.toFixed(2)}`, 25, currentY);
      }

      if (deductions[i]) {
        const [key, value] = deductions[i];
        doc.setFont('helvetica', 'normal');
        doc.text(`${key}: ₹${value.toFixed(2)}`, midX + 5, currentY);
      }

      currentY += rowHeight;
    }

    // Net Salary
    doc.setFont('helvetica', 'bold');
    doc.rect(20, currentY, 170, 10);
    doc.text(`Net Salary: ₹${breakdown.netSalary.toFixed(2)}`, 25, currentY + 7);

    doc.save(`${payslipData.name}_Payslip.pdf`);
  };

  return <button onClick={handleDownload}>Download Payslip PDF</button>;
}

export default PayslipPDF;
