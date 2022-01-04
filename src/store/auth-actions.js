import { fb } from "../others/firebase";
import { authActions } from "./auth-slice";

export const fetchUserData = (user) => async(dispatch) => {
    try {
        const userCollection = await fb.collection("users");
        const snapshot = await userCollection.get();
        const token = await user.getIdToken();

        const snapshotDocs = [...snapshot.docs];
        const datas = snapshotDocs.map((doc) => doc.data());
        const data = datas.find((userData) => userData.uid === user.uid);

        const { uid, email, displayName, role } = data;

        const userData = { uid, email, displayName, role, token };
        // console.log(userData);

        dispatch(authActions.updateCurrentUser(userData));
    } catch (error) {
        console.log(`Failed to fetch user data: ${error.message}`);
    }
};