import { collection, doc, setDoc, getDocs, deleteDoc, updateDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from './firebase';
import { LeadItem, LeadStatus, CompanySettings } from '../types';
import { INITIAL_LEADS, INITIAL_COMPANY_SETTINGS } from '../data/sectorsData';

const LEADS_COLLECTION = 'leads';
const SETTINGS_COLLECTION = 'settings';
const SETTINGS_DOC_ID = 'main_settings';

export const subscribeToLeads = (onData: (leads: LeadItem[]) => void) => {
  const q = query(collection(db, LEADS_COLLECTION), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snapshot) => {
    const leads: LeadItem[] = [];
    snapshot.forEach((doc) => {
      leads.push({ id: doc.id, ...doc.data() } as LeadItem);
    });
    onData(leads);
  });
};

export const addLeadToFirebase = async (leadData: Omit<LeadItem, 'id'>) => {
  const newRef = doc(collection(db, LEADS_COLLECTION));
  await setDoc(newRef, leadData);
};

export const updateLeadStatusInFirebase = async (id: string, status: LeadStatus) => {
  const leadRef = doc(db, LEADS_COLLECTION, id);
  await updateDoc(leadRef, { status });
};

export const updateLeadNotesInFirebase = async (id: string, notes: string) => {
  const leadRef = doc(db, LEADS_COLLECTION, id);
  await updateDoc(leadRef, { notes });
};

export const deleteLeadFromFirebase = async (id: string) => {
  const leadRef = doc(db, LEADS_COLLECTION, id);
  await deleteDoc(leadRef);
};

export const subscribeToSettings = (onData: (settings: CompanySettings) => void) => {
  return onSnapshot(doc(db, SETTINGS_COLLECTION, SETTINGS_DOC_ID), (docSnap) => {
    if (docSnap.exists()) {
      onData(docSnap.data() as CompanySettings);
    } else {
      // Initialize if not present
      setDoc(doc(db, SETTINGS_COLLECTION, SETTINGS_DOC_ID), INITIAL_COMPANY_SETTINGS);
      onData(INITIAL_COMPANY_SETTINGS);
    }
  });
};

export const updateSettingsInFirebase = async (settings: CompanySettings) => {
  const ref = doc(db, SETTINGS_COLLECTION, SETTINGS_DOC_ID);
  await setDoc(ref, settings);
};

export const resetFirebaseDemoData = async () => {
  // Delete all leads
  const snapshot = await getDocs(collection(db, LEADS_COLLECTION));
  const deletePromises = snapshot.docs.map((d) => deleteDoc(doc(db, LEADS_COLLECTION, d.id)));
  await Promise.all(deletePromises);

  // Add initial leads
  const addPromises = INITIAL_LEADS.map((lead) => {
    const { id, ...rest } = lead;
    return setDoc(doc(db, LEADS_COLLECTION, id), rest);
  });
  await Promise.all(addPromises);

  // Reset settings
  await setDoc(doc(db, SETTINGS_COLLECTION, SETTINGS_DOC_ID), INITIAL_COMPANY_SETTINGS);
};
