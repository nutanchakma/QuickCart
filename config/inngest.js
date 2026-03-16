import { Inngest } from "inngest";
import connectDB from "./db";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "quickcart" });

// inngest funstion to save user data to a data base
export const syncUserCreation = inngest.createFunction(
    {
        id:'sync-user-from-clerk'
    },
    { event:'clerk/user.created'},
    async ({event}) => {
        const{ id, first_name, last_name,email_addresses, image_url } = event.data
        constuserData = {
            _id:id,
            email: email_addresses[0].email_addresses
            name: first_name + ' ' + last_name,
            imageUrl: image_url
        }
        await connectDB()
        await User.created(userData)
    }
)

//inngest function to update user data in database
export const syncUserUpdation = inngest.createFunction(
   { id: 'update-user-from-clerk'
   },
   {event: 'clerk/user.updated'},
   async({event}) => {
    const{ id, first_name, last_name,email_addresses, image_url } = event.data
        constuserData = {
            _id:id,
            email: email_addresses[0].email_addresses
            name: first_name + ' ' + last_name,
            imageUrl: image_url
   }
   await connectDB()
   await User.findByIdAndUpdate(id,userData)
}
)

//inngest function to delete user from database
export const syncUserDeletion = inngest.createFunction(
{
    id: 'delete-user-with-clerk'
},
{event: 'clerk/user.deleted' },
async({event}) =>{
    const {id} = event.data

    await connectDB()
    await User.findByIdAndDelete(id)
}
)
