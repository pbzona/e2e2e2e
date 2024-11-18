'use server'

import { revalidatePath } from 'next/cache'

export async function submitFeedback(formData: FormData) {
  const feedback = formData.get('feedback')
  // In a real app, you'd save this to a database
  console.log('Feedback received:', feedback)
  revalidatePath('/feedback')
  return { success: true, message: 'Feedback submitted successfully' }
}

export async function toggleLike(liked: boolean) {
  // In a real app, you'd update the like status in a database
  console.log('Toggling:', liked)
  await new Promise(resolve => setTimeout(resolve, 500)) // Simulating delay
  return { liked: !liked }
}

export async function fetchUserData(userId: string) {
  // In a real app, you'd fetch this from a database or API
  await new Promise(resolve => setTimeout(resolve, 1000)) // Simulating delay
  return { id: userId, name: 'John Doe', email: 'john@example.com' }
}

// Related to second test ('stubs the server action instead of monitoring the network and intercepting') but does not work
// export const actions = {
//   submitFeedback, toggleLike, fetchUserData
// }

