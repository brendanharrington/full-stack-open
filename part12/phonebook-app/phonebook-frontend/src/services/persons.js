const baseUrl = '/api/persons';

export const getAll = async () => {
  const response = await fetch(baseUrl);
  if (!response.ok) {
    throw new Error('Failed to fetch persons');
  }
  return response.json();
};

export const create = async (newPerson) => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newPerson),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create person');
  }
  return response.json();
};

export const update = async (id, updatedPerson) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedPerson),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update person');
  }
  return response.json();
};

export const remove = async (id) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete person');
  }
  return response.status === 204;
};