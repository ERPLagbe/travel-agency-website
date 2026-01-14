import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

/* ----------------------------------------
   TYPES (safe defaults)
----------------------------------------- */
type PackageItem = {
  name?: string;
  item_name?: string;
  item_group?: string;
  dropdown_name?: string;
  standard_rate?: number;
};

type DropdownItem = {
  dropdown_name: string;
  item_group?: string;
};

type Props = {
  allPackages: PackageItem[];
  navigationDropdownItems: DropdownItem[];
};

/* ----------------------------------------
   COMPONENT
----------------------------------------- */
export default function PackageListing({
  allPackages = [],
  navigationDropdownItems = [],
}: Props) {
  /* ----------------------------------------
     ROUTE PARAMS
  ----------------------------------------- */
  const params = useParams();

  const dropdownName = params.dropdown_name;
  const itemGroupParam = params.item_group;

  const normalizedItemGroup = itemGroupParam
    ? itemGroupParam
        .split('-')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')
    : null;

  /* ----------------------------------------
     STATE
  ----------------------------------------- */
  const [selectedDropdowns, setSelectedDropdowns] = useState<string[]>([]);
  const [selectedItemGroups, setSelectedItemGroups] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'name' | 'price-low' | 'price-high'>(
    'name'
  );

  const safePackages: PackageItem[] = Array.isArray(allPackages)
    ? allPackages
    : [];

  /* ----------------------------------------
     URL → FILTER SYNC (NO LOOP)
  ----------------------------------------- */
  useEffect(() => {
    if (!navigationDropdownItems.length) return;

    let nextDropdowns: string[] = [];
    let nextGroups: string[] = [];

    if (dropdownName) {
      const match = navigationDropdownItems.find(
        d => d.dropdown_name?.toLowerCase() === dropdownName.toLowerCase()
      );
      if (match) nextDropdowns = [match.dropdown_name];
    }

    if (normalizedItemGroup) {
      nextGroups = [normalizedItemGroup];

      const parent = navigationDropdownItems.find(
        d => d.item_group === normalizedItemGroup
      );
      if (parent) nextDropdowns = [parent.dropdown_name];
    }

    if (
      JSON.stringify(nextDropdowns) !==
      JSON.stringify(selectedDropdowns)
    ) {
      setSelectedDropdowns(nextDropdowns);
    }

    if (
      JSON.stringify(nextGroups) !==
      JSON.stringify(selectedItemGroups)
    ) {
      setSelectedItemGroups(nextGroups);
    }
  }, [
    dropdownName,
    normalizedItemGroup,
    navigationDropdownItems,
    selectedDropdowns,
    selectedItemGroups,
  ]);

  /* ----------------------------------------
     FILTER + SORT
  ----------------------------------------- */
  const filteredPackages = useMemo(() => {
    let result = [...safePackages];

    if (selectedDropdowns.length) {
      result = result.filter(p =>
        selectedDropdowns.includes(p.dropdown_name || '')
      );
    }

    if (selectedItemGroups.length) {
      result = result.filter(p =>
        selectedItemGroups.includes(p.item_group || '')
      );
    }

    switch (sortBy) {
      case 'price-low':
        result.sort(
          (a, b) => (a.standard_rate || 0) - (b.standard_rate || 0)
        );
        break;

      case 'price-high':
        result.sort(
          (a, b) => (b.standard_rate || 0) - (a.standard_rate || 0)
        );
        break;

      case 'name':
      default:
        result.sort((a, b) =>
          (a.item_name || '').localeCompare(b.item_name || '')
        );
        break;
    }

    return result;
  }, [safePackages, selectedDropdowns, selectedItemGroups, sortBy]);

  const isDropdownView = Boolean(dropdownName);

  /* ----------------------------------------
     RENDER
  ----------------------------------------- */
  return (
    <div className="package-listing">
      {/* SORT */}
      <div className="sort-bar">
        <select
          value={sortBy}
          onChange={e =>
            setSortBy(e.target.value as 'name' | 'price-low' | 'price-high')
          }
        >
          <option value="name">Name</option>
          <option value="price-low">Price: Low → High</option>
          <option value="price-high">Price: High → Low</option>
        </select>
      </div>

      {/* EMPTY STATE */}
      {filteredPackages.length === 0 && (
        <p>No packages found.</p>
      )}

      {/* LIST */}
      <div className="package-grid">
        {filteredPackages.map((pkg, index) => (
          <div className="package-card" key={index}>
            <h3>{pkg.item_name || 'Untitled Package'}</h3>
            <p>{pkg.item_group || 'Uncategorized'}</p>
            <strong>
              {pkg.standard_rate
                ? `৳${pkg.standard_rate}`
                : 'Price on request'}
            </strong>
          </div>
        ))}
      </div>
    </div>
  );
}
