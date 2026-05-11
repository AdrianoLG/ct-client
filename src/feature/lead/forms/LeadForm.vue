<template>
  <div class="bg-white p-6 rounded-lg shadow-md w-full">
    <h3 class="text-lg font-bold">Register New Lead</h3>
    <div class="flex flex-col gap-4 mt-4">
      <div>
        <label class="text-sm">Full Name</label>
        <input type="text" class="border p-2 w-full rounded-md" placeholder="Name" >
      </div>
      <div>
        <label class="text-sm">Email Address</label>
        <input
          type="email"
          class="border p-2 w-full rounded-md"
          placeholder="Email"
        >
      </div>
      <div>
        <label class="text-sm">Birth Date</label>
        <input
          type="date"
          class="border p-2 w-full rounded-md"
          placeholder="Birth Date"
        >
      </div>
      <div>
        <label class="text-sm">Select City</label>
        <select class="border p-2 w-full rounded-md">
          <option value="">Select City</option>
          <option value="new-york">New York</option>
          <option value="los-angeles">Los Angeles</option>
          <option value="chicago">Chicago</option>
        </select>
      </div>
      <div>
        <label class="text-sm">Select Campaign</label>
        <select class="border p-2 w-full rounded-md">
          <option value="">Select Campaign</option>
          <option value="campaign-1">Campaign 1</option>
          <option value="campaign-2">Campaign 2</option>
          <option value="campaign-3">Campaign 3</option>
        </select>
      </div>
      <div>
        <input id="terms" type="checkbox" class="mr-2" >
        <label for="terms">I agree to the Terms & Conditions</label>
      </div>
    </div>
    <button class="bg-indigo-500 text-white px-4 py-2 rounded-md mt-6 w-full">
      Submit Registration
    </button>
  </div>
</template>
