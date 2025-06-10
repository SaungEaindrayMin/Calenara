'use client';

import { signOutAction } from "../actions/signOutAction";


export function LogoutButton() {
  return (
    <form action={signOutAction}>
      <button
        type="submit"
        className="w-full text-left px-2 py-1 hover:bg-red-200"
      >
        Log Out
      </button>
    </form>
  );
}
