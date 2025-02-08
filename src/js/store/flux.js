const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			contacts: [],
			agendaSlug: "fp",
			requestUrlBase_contact: 'https://playground.4geeks.com/contact'
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			
			/* ~~~~~~CREATE AGENDA~~~~~~~ */
			createAndSetAgenda: async () => {
				try {
					console.log("I'm in createAndSetAgenda.");
					const store = getStore();
					const requestUrl = `${store.requestUrlBase_contact}/agendas/${store.agendaSlug}`;
					// const headers = {
					// 	'accept': 'application/json',
					// 	'Content-Type': 'application/json'
					// };
					const response = await fetch(requestUrl,{
						method: 'POST',
						//headers
					})
					console.log("This is the response",response.body);
					if(response.status===400) {
						console.log("Are we getting a 400?");
						getActions().getAndSetContacts();
						return;
					}
				}
				catch (error) {
					console.error('Error', error);
				}
			},

			getContactById: (contactId) => {
				const store = getStore();
				return store.contacts.find(contact => contact.id === parseInt(contactId, 10)) || null;
			},

			/* ~~~~~~GET CONTACTS~~~~~~~ */
			getAndSetContacts: async () => {
				try {
				console.log("I'm in getContacts.");
					const store = getStore();
					const requestUrl = `${store.requestUrlBase_contact}/agendas/${store.agendaSlug}/contacts`;
					
					const response = await fetch(requestUrl,{
						method: 'GET'
					})
					const data = await response.json();
					console.log(`Contact data is: `,data);
					if(data){
						setStore({ contacts: data.contacts });
						console.log("Contacts in store are: ",store.contacts);
					}
				}
				catch (error) {
					console.error('Error', error);
				}
			},

			/* ~~~~~~CREATE CONTACT~~~~~~~ */
			createContact: async (contact) => {
				try {
					console.log("I'm in createContact.");
					const store = getStore();
					const requestUrl = `${store.requestUrlBase_contact}/agendas/${store.agendaSlug}/contacts`;
					const headers = {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					};
					const body = {
						name: contact.name,
						phone: contact.phone,
						email: contact.email,
						address: contact.address
					};
			
					const response = await fetch(requestUrl, {
						method: 'POST',
						headers,
						body: JSON.stringify(body)
					});
			
					if (!response.ok) {
						throw new Error(`HTTP error! Status: ${response.status}`);
					}
			
					const data = await response.json();
					console.log(data);
			
					// Update the store with the new contact
					const updatedContacts = getActions().getAndSetContacts();
			
				} catch (error) {
					console.error("Error in createContact:", error);
				}
			},

			/* ~~~~~~UPDATE CONTACT~~~~~~~ */
			updateContact: async (updatedContactInfo) => {
				try {
					console.log("I'm in updateContact.");
					const store = getStore();
					const requestUrl = `${store.requestUrlBase_contact}/agendas/${store.agendaSlug}/contacts/${updatedContactInfo.id}`;
					const headers = {
						'accept': 'application/json',
						'Content-Type': 'application/json'
					};
					const body = {
						'name': updatedContactInfo.name,
						'phone': updatedContactInfo.phone,
						'email': updatedContactInfo.email,
						'address': updatedContactInfo.address,
						'id': updatedContactInfo.id
					};
	
					const response = await fetch(requestUrl,{
						method: 'PUT',
						headers,
						body: JSON.stringify(body)
					})
					if (!response.ok) {
						throw new Error(`HTTP error! Status: ${response.status}`);
					}

					const data = await response.json();
					console.log(data);
			
					// Update the store with the updated contact
					const updatedContacts = getActions().getAndSetContacts();

				} catch (error) {
					console.error("Error in updateContact:", error);
				}
			},

			/* ~~~~~~UPDATE CONTACT~~~~~~~ */
			deleteContact: async (contactID) => {
				console.log("I'm in deleteContact.");
				try {
					const store = getStore();
					const actions = getActions();
					const requestUrl = `${store.requestUrlBase_contact}/agendas/${store.agendaSlug}/contacts/${contactID}`;
					// const headers = {
					// 	'accept': 'applications/json',
					// 	'Content-Type': 'application/json'
					// };

					const reponse = await fetch(requestUrl,{
						method: 'DELETE'
						//headers
					})
					actions.getAndSetContacts();
				} catch (error) {
					console.error("Error in updateContact:", error);
				}
			},
		}
	};
};

export default getState;
