import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

interface BetaApplicationData {
  firstName: string;
  lastName: string;
  email: string;
  devices: {
    name: string;
    type: string;
  }[];
}

export async function submitBetaApplication(data: BetaApplicationData) {
  try {
    // 1. Add to beta_testers collection
    const testerPromise = addDoc(collection(db, "beta_testers"), {
      ...data,
      appliedAt: serverTimestamp(),
    });

    // 2. Add to mail collection (Trigger Email Extension)
    const emailPromise = addDoc(collection(db, "mail"), {
      to: "founder@vyleralabs.com",
      message: {
        subject: `[Vylera Beta] New Applicant: ${data.firstName} ${data.lastName}`,
        html: `
          <div style="font-family: sans-serif; color: #0a192f; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
            <div style="background-color: #0a192f; padding: 20px; color: #64ffda;">
              <h2 style="margin: 0;">New Beta Access Request</h2>
            </div>
            <div style="padding: 24px;">
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #e2e8f0;">Name</td>
                  <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${data.firstName} ${data.lastName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #e2e8f0;">Email</td>
                  <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${data.email}</td>
                </tr>
              </table>

              <h3 style="margin-bottom: 12px; border-bottom: 2px solid #64ffda; display: inline-block; padding-bottom: 4px;">Device Ecosystem</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <thead>
                  <tr style="background-color: #f7fafc;">
                    <th style="text-align: left; padding: 12px; border-bottom: 2px solid #e2e8f0;">Device Name</th>
                    <th style="text-align: left; padding: 12px; border-bottom: 2px solid #e2e8f0;">Type</th>
                  </tr>
                </thead>
                <tbody>
                  ${data.devices.map(device => `
                    <tr>
                      <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">${device.name}</td>
                      <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">${device.type}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
            <div style="background-color: #f7fafc; padding: 12px; text-align: center; font-size: 12px; color: #718096;">
              Vylera Labs Secure Gateway
            </div>
          </div>
        `,
      },
    });

    await Promise.all([testerPromise, emailPromise]);
    return { success: true };
  } catch (error) {
    console.error("Error submitting beta application:", error);
    throw error;
  }
}
