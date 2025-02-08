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
				console.log("I'm in createContact.");
				const store = getStore();
				const requestUrl = `${store.requestUrlBase_contact}/agendas/${store.agendaSlug}/contacts`;
				const headers = {
					'accept': 'application/json',
					'Content-Type': 'application/json'
				};
				const body = {
					'name': contact.name,
					'phone': contact.phone,
					'email': contact.email,
					'address': contact.address
				}
				await fetch(requestUrl,{
					method: 'POST',
					headers,
					body: JSON.stringify(body)
				})
				.then(response => response.json())
				.then(data => {
					console.log(data)
					/*
					data is:
					{
						"name": "string",
						"phone": "string",
						"email": "string",
						"address": "string",
						"id": 0
					}
					*/
					
					// Update the store with the new contact
					const updatedContacts = getActions.getAndSetContacts();
					setStore({ contacts: updatedContacts });
				})
				.catch(error => console.error('Error', error));
			},

			/* ~~~~~~UPDATE CONTACT~~~~~~~ */
			updatecontact: async (updatedContactInfo) => {
				console.log("I'm in updateContact.");
				const store = getStore();
				const requestUrl = `${store.requestUrlBase_contact}/agendas/${store.agendaSlug}/contacts/${updatedContactInfo.contact_id}`;
				const headers = {
					'accept': 'applications/json',
					'Content-Type': 'application/json'
				};
				const body = {
					'name': updatedContactInfo.name,
					'phone': updatedContactInfo.phone,
					'email': updatedContactInfo.email,
					'address': updatedContactInfo.address
				};

				await fetch(requestUrl,{
					method: 'PUT',
					headers,
					body: JSON.stringify(body)
				})
				.then(response => response.json())
				.then(data => {
					console.log(data)
					/*
					data is:
					{
						"name": "string",
						"phone": "string",
						"email": "string",
						"address": "string",
						"id": 0	
					}
					*/
					store.getActions.getAndSetContacts();
				})
				.catch(error => console.error('Error', error));
			},

			/* ~~~~~~UPDATE CONTACT~~~~~~~ */
			deleteContact: async (contactID) => {
				console.log("I'm in deleteContact.");
				const store = getStore();
				const requestUrl = `${store.requestUrlBase_contact}/agendas/${store.agendaSlug}/contacts/${updatedContactInfo.contact_id}`;
				const headers = {
					'accept': 'applications/json',
					'Content-Type': 'application/json'
				};

				await fetch(requestUrl,{
					method: 'PUT',
					headers,
				})
				.then(response => response.json())
				.then(data => {
					console.log(data)
					/*
					data is:
					"string"
					*/
					store.getActions.getAndSetContacts();
				})
				.catch(error => console.error('Error', error));
			},
		}
	};
};

export default getState;
