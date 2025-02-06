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
			agendaSlug: ""
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
			createAgenda: (slug) => {
				console.log("I'm in createAgenda.");
				const requestUrl = `https://playground.4geeks.com/contact/agendas/${slug}`;
				const headers = {
					'accept': 'application/json',
					'Content-Type': 'application/json'
				};
				fetch(requestUrl,{
					method: 'POST',
					headers
				})
				.then(response => response.json())
				.then(data => {
					console.log(data)
					/*
					data is:
					{
						"slug": "string",
						"id": 0
					}
					*/
					setStore({agendaSlug: data.slug});
				})
				.catch(error => console.error('Error', error));
			},

			/* ~~~~~~GET CONTACTS~~~~~~~ */
			getAndSetContacts: () => {
				console.log("I'm in getContacts.");
				const store = getStore();
				const requestUrl = `https://playground.4geeks.com/contact/agendas/${store.agendaSlug}/contacts`;
				const headers = {
					'accept': 'application/json',
					'Content-Type': 'application/json'
				};
				
				fetch(requestUrl,{
					method: 'GET',
					headers,
				})
				.then(response => response.json())
				.then(data => {
					console.log(data)
					/*
					data is:
						{
						"contacts": [
							{
							"name": "string",
							"phone": "string",
							"email": "string",
							"address": "string",
							"id": 0
							}
						]
						}
					*/
					
					// Update the store with the contacts
					setStore({ contacts: data.contacts });
				})
				.catch(error => console.error('Error', error));
			},

			/* ~~~~~~CREATE CONTACT~~~~~~~ */
			createContact: (contact) => {
				console.log("I'm in createContact.");
				const store = getStore();
				const requestUrl = `https://playground.4geeks.com/contact/agendas/${store.agendaSlug}/contacts`;
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
				fetch(requestUrl,{
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
			updatecontact: (contactID) => {
				console.log("I'm in updateContact.");
			},

			/* ~~~~~~UPDATE CONTACT~~~~~~~ */
			deleteContact: (contactID) => {
				console.log("I'm in deleteContact.");
			},
		}
	};
};

export default getState;
