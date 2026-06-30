import { useEffect, useMemo, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Eye,
  EyeOff,
  Gem,
  Image,
  Pencil,
  Plus,
  RefreshCcw,
  Save,
  Search,
  Star,
  ToggleLeft,
  ToggleRight,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import {
  createAdminSlab,
  deleteAdminSlab,
  deleteAdminSlabImage,
  getAdminSlabs,
  moveAdminSlabImage,
  setAdminSlabPrimaryImage,
  updateAdminSlab,
  updateAdminSlabActive,
  updateAdminSlabFeatured,
  updateAdminSlabImageType,
  updateAdminSlabImageVisibility,
  updateAdminSlabNewArrival,
  updateAdminSlabStatus,
  uploadAdminSlabGalleryImage,
  uploadAdminSlabImage,
} from "../../lib/adminQueries";
import type { AdminSlab } from "../../lib/adminQueries";
import type { Slab, SlabImageType } from "../../types/slab";

const slabStatuses: Slab["status"][] = [
  "available",
  "limited",
  "on_hold",
  "sold",
];

const inventoryTypes: Slab["inventoryType"][] = ["full_slab", "remnant"];

const galleryImageTypes: Exclude<SlabImageType, "primary">[] = [
  "gallery",
  "detail",
  "inspiration",
];

type AdminSlabFormState = {
  name: string;
  materialType: string;
  colorFamily: string;
  thickness: string;
  dimensions: string;
  finish: string;
  inventoryType: Slab["inventoryType"];
  status: Slab["status"];
  description: string;
  styleTags: string;
  internalNotes: string;
  primaryImageUrl: string;
};

type AdminSlabCreateFormState = AdminSlabFormState & {
  slug: string;
  isActive: boolean;
  isFeatured: boolean;
  isNewArrival: boolean;
};

function createDefaultCreateFormState(): AdminSlabCreateFormState {
  return {
    slug: "",
    name: "",
    materialType: "",
    colorFamily: "",
    thickness: "",
    dimensions: "",
    finish: "",
    inventoryType: "full_slab",
    status: "available",
    description: "",
    styleTags: "",
    internalNotes: "",
    primaryImageUrl: "",
    isActive: true,
    isFeatured: false,
    isNewArrival: true,
  };
}

function formatLabel(value: string | null | undefined) {
  return (value || "")
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function formatDate(date: string) {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Date unavailable";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(parsedDate);
}

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function createEditFormState(slab: AdminSlab): AdminSlabFormState {
  return {
    name: slab.name || "",
    materialType: slab.materialType || "",
    colorFamily: slab.colorFamily || "",
    thickness: slab.thickness || "",
    dimensions: slab.dimensions || "",
    finish: slab.finish || "",
    inventoryType: slab.inventoryType,
    status: slab.status,
    description: slab.description || "",
    styleTags: slab.styleTags.join(", "),
    internalNotes: slab.internalNotes || "",
    primaryImageUrl: slab.primaryImageUrl || slab.imageUrl || "",
  };
}

function parseStyleTags(tags: string) {
  return tags
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function getSelectedFileName(file: File | null) {
  if (!file) {
    return "No file selected";
  }

  return file.name;
}

function getSortedSlabImages(slab: AdminSlab) {
  return [...slab.images].sort((a, b) => {
    if (a.isPrimary !== b.isPrimary) {
      return Number(b.isPrimary) - Number(a.isPrimary);
    }

    return a.sortOrder - b.sortOrder;
  });
}

export function AdminSlabs() {
  const [slabs, setSlabs] = useState<AdminSlab[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<Slab["status"] | "all">(
    "all"
  );
  const [materialFilter, setMaterialFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [updatingId, setUpdatingId] = useState("");
  const [savingId, setSavingId] = useState("");
  const [deletingId, setDeletingId] = useState("");
  const [editingId, setEditingId] = useState("");
  const [editForm, setEditForm] = useState<AdminSlabFormState | null>(null);
  const [editImageFile, setEditImageFile] = useState<File | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [createForm, setCreateForm] = useState<AdminSlabCreateFormState>(
    createDefaultCreateFormState()
  );
  const [createImageFile, setCreateImageFile] = useState<File | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [galleryFiles, setGalleryFiles] = useState<Record<string, File | null>>(
    {}
  );
  const [galleryAltTexts, setGalleryAltTexts] = useState<
    Record<string, string>
  >({});
  const [galleryTypes, setGalleryTypes] = useState<
    Record<string, Exclude<SlabImageType, "primary">>
  >({});
  const [uploadingGalleryId, setUploadingGalleryId] = useState("");
  const [imageActionId, setImageActionId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function loadSlabs(options?: { showRefreshingState?: boolean }) {
    try {
      if (options?.showRefreshingState) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }

      setErrorMessage("");

      const liveSlabs = await getAdminSlabs();
      setSlabs(liveSlabs);
    } catch (error) {
      console.error("Failed to load admin slabs:", error);
      setErrorMessage(
        "Inventory could not be loaded. Please confirm your admin session and permissions."
      );
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }

  useEffect(() => {
    loadSlabs();
  }, []);

  const materialOptions = useMemo(() => {
    return Array.from(new Set(slabs.map((slab) => slab.materialType)))
      .filter(Boolean)
      .sort();
  }, [slabs]);

  const filteredSlabs = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return slabs.filter((slab) => {
      const matchesStatus =
        statusFilter === "all" || slab.status === statusFilter;

      const matchesMaterial =
        materialFilter === "all" || slab.materialType === materialFilter;

      const searchableText = [
        slab.name,
        slab.slug,
        slab.materialType,
        slab.colorFamily,
        slab.thickness,
        slab.dimensions,
        slab.finish,
        slab.status,
        slab.inventoryType,
        slab.description,
        slab.internalNotes,
        ...slab.styleTags,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !normalizedSearch || searchableText.includes(normalizedSearch);

      return matchesStatus && matchesMaterial && matchesSearch;
    });
  }, [materialFilter, searchTerm, slabs, statusFilter]);

  const slabCounts = useMemo(() => {
    return slabs.reduce(
      (counts, slab) => {
        counts.total += 1;

        if (slab.isActive) {
          counts.active += 1;
        }

        if (slab.isFeatured) {
          counts.featured += 1;
        }

        if (slab.isNewArrival) {
          counts.newArrivals += 1;
        }

        if (slab.status === "sold") {
          counts.sold += 1;
        }

        return counts;
      },
      {
        total: 0,
        active: 0,
        featured: 0,
        newArrivals: 0,
        sold: 0,
      }
    );
  }, [slabs]);

  function replaceSlabInState(updatedSlab: AdminSlab) {
    setSlabs((currentSlabs) =>
      currentSlabs.map((slab) =>
        slab.id === updatedSlab.id ? updatedSlab : slab
      )
    );
  }

  function handleCreateImageSelect(event: ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0] ?? null;
    setCreateImageFile(selectedFile);
  }

  function handleEditImageSelect(event: ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0] ?? null;
    setEditImageFile(selectedFile);
  }

  function handleGalleryImageSelect(
    slabId: string,
    event: ChangeEvent<HTMLInputElement>
  ) {
    const selectedFile = event.target.files?.[0] ?? null;

    setGalleryFiles((currentFiles) => ({
      ...currentFiles,
      [slabId]: selectedFile,
    }));
  }

  function updateGalleryAltText(slabId: string, value: string) {
    setGalleryAltTexts((currentAltTexts) => ({
      ...currentAltTexts,
      [slabId]: value,
    }));
  }

  function updateGalleryType(
    slabId: string,
    value: Exclude<SlabImageType, "primary">
  ) {
    setGalleryTypes((currentTypes) => ({
      ...currentTypes,
      [slabId]: value,
    }));
  }

  function resetGalleryUploadState(slabId: string) {
    setGalleryFiles((currentFiles) => ({
      ...currentFiles,
      [slabId]: null,
    }));

    setGalleryAltTexts((currentAltTexts) => ({
      ...currentAltTexts,
      [slabId]: "",
    }));

    setGalleryTypes((currentTypes) => ({
      ...currentTypes,
      [slabId]: "gallery",
    }));
  }

  function openEditForm(slab: AdminSlab) {
    setEditingId(slab.id);
    setEditForm(createEditFormState(slab));
    setEditImageFile(null);
    setErrorMessage("");
  }

  function closeEditForm() {
    setEditingId("");
    setEditForm(null);
    setEditImageFile(null);
  }

  function updateEditForm<Field extends keyof AdminSlabFormState>(
    field: Field,
    value: AdminSlabFormState[Field]
  ) {
    setEditForm((currentForm) =>
      currentForm ? { ...currentForm, [field]: value } : currentForm
    );
  }

  function updateCreateForm<Field extends keyof AdminSlabCreateFormState>(
    field: Field,
    value: AdminSlabCreateFormState[Field]
  ) {
    setCreateForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  }

  function handleCreateNameChange(nextName: string) {
    setCreateForm((currentForm) => ({
      ...currentForm,
      name: nextName,
      slug: slugify(nextName),
    }));
  }

  function resetCreateForm() {
    setCreateForm(createDefaultCreateFormState());
    setCreateImageFile(null);
    setShowCreateForm(false);
  }

  async function handleCreateSubmit(event: FormEvent) {
    event.preventDefault();

    if (!createForm.name.trim() || !createForm.materialType.trim()) {
      setErrorMessage("Slab name and material type are required.");
      return;
    }

    const finalSlug = createForm.slug.trim() || slugify(createForm.name);

    if (!finalSlug) {
      setErrorMessage("A valid slug is required.");
      return;
    }

    try {
      setIsCreating(true);
      setErrorMessage("");

      let uploadedImageUrl = "";

      if (createImageFile) {
        const uploadResult = await uploadAdminSlabImage(
          createImageFile,
          finalSlug
        );

        uploadedImageUrl = uploadResult.publicUrl;
      }

      const newSlab = await createAdminSlab({
        slug: finalSlug,
        name: createForm.name.trim(),
        material_type: createForm.materialType.trim(),
        color_family: createForm.colorFamily.trim() || null,
        thickness: createForm.thickness.trim() || null,
        dimensions: createForm.dimensions.trim() || null,
        finish: createForm.finish.trim() || null,
        inventory_type: createForm.inventoryType,
        status: createForm.status,
        description: createForm.description.trim() || null,
        style_tags: parseStyleTags(createForm.styleTags),
        internal_notes: createForm.internalNotes.trim() || null,
        primary_image_url: uploadedImageUrl || null,
        is_active: createForm.isActive,
        is_featured: createForm.isFeatured,
        is_new_arrival: createForm.isNewArrival,
      });

      setSlabs((currentSlabs) => [newSlab, ...currentSlabs]);
      setStatusFilter("all");
      setMaterialFilter("all");
      setSearchTerm("");
      resetCreateForm();
    } catch (error) {
      console.error("Failed to create slab:", error);
      setErrorMessage(
        "The new slab could not be created. Check for duplicate slugs, storage bucket setup, or admin permissions."
      );
    } finally {
      setIsCreating(false);
    }
  }

  async function updateSlabOptimistically(
    slabId: string,
    optimisticUpdate: Partial<AdminSlab>,
    updateRequest: () => Promise<AdminSlab>
  ) {
    const previousSlabs = slabs;

    try {
      setUpdatingId(slabId);
      setErrorMessage("");

      setSlabs((currentSlabs) =>
        currentSlabs.map((slab) =>
          slab.id === slabId ? { ...slab, ...optimisticUpdate } : slab
        )
      );

      const updatedSlab = await updateRequest();

      setSlabs((currentSlabs) =>
        currentSlabs.map((slab) => (slab.id === slabId ? updatedSlab : slab))
      );
    } catch (error) {
      console.error("Failed to update slab:", error);
      setSlabs(previousSlabs);
      setErrorMessage(
        "The slab could not be updated. Please confirm your admin permissions and try again."
      );
    } finally {
      setUpdatingId("");
    }
  }

  async function handleEditSubmit(event: FormEvent, slab: AdminSlab) {
    event.preventDefault();

    if (!editForm) {
      return;
    }

    if (!editForm.name.trim() || !editForm.materialType.trim()) {
      setErrorMessage("Slab name and material type are required.");
      return;
    }

    try {
      setSavingId(slab.id);
      setErrorMessage("");

      let uploadedImageUrl = "";

      if (editImageFile) {
        const uploadResult = await uploadAdminSlabImage(
          editImageFile,
          slab.slug || editForm.name
        );

        uploadedImageUrl = uploadResult.publicUrl;
      }

      const updatedSlab = await updateAdminSlab(slab.id, {
        name: editForm.name.trim(),
        material_type: editForm.materialType.trim(),
        color_family: editForm.colorFamily.trim() || null,
        thickness: editForm.thickness.trim() || null,
        dimensions: editForm.dimensions.trim() || null,
        finish: editForm.finish.trim() || null,
        inventory_type: editForm.inventoryType,
        status: editForm.status,
        description: editForm.description.trim() || null,
        style_tags: parseStyleTags(editForm.styleTags),
        internal_notes: editForm.internalNotes.trim() || null,
        primary_image_url: uploadedImageUrl || editForm.primaryImageUrl || null,
      });

      replaceSlabInState(updatedSlab);
      closeEditForm();
    } catch (error) {
      console.error("Failed to save slab details:", error);
      setErrorMessage(
        "The slab details could not be saved. Check storage bucket setup or admin permissions."
      );
    } finally {
      setSavingId("");
    }
  }

  async function handleGalleryUpload(event: FormEvent, slab: AdminSlab) {
    event.preventDefault();

    const selectedFile = galleryFiles[slab.id] ?? null;

    if (!selectedFile) {
      setErrorMessage("Choose a gallery image before uploading.");
      return;
    }

    try {
      setUploadingGalleryId(slab.id);
      setErrorMessage("");

      const selectedImageType = galleryTypes[slab.id] || "gallery";

      const updatedSlab = await uploadAdminSlabGalleryImage({
        slabId: slab.id,
        slabSlugOrName: slab.slug || slab.name,
        file: selectedFile,
        altText:
          galleryAltTexts[slab.id]?.trim() ||
          `${slab.name} ${formatLabel(selectedImageType)} image`,
        imageType: selectedImageType,
        isPrimary: false,
      });

      replaceSlabInState(updatedSlab);
      resetGalleryUploadState(slab.id);
    } catch (error) {
      console.error("Failed to upload gallery image:", error);
      setErrorMessage(
        "The gallery image could not be uploaded. Check storage bucket setup or admin permissions."
      );
    } finally {
      setUploadingGalleryId("");
    }
  }

  async function handleSetPrimaryImage(slab: AdminSlab, imageId: string) {
    try {
      setImageActionId(`${slab.id}:${imageId}:primary`);
      setErrorMessage("");

      const updatedSlab = await setAdminSlabPrimaryImage(slab.id, imageId);
      replaceSlabInState(updatedSlab);
    } catch (error) {
      console.error("Failed to set primary image:", error);
      setErrorMessage("The primary image could not be updated.");
    } finally {
      setImageActionId("");
    }
  }

  async function handleImageVisibilityToggle(
    slab: AdminSlab,
    imageId: string,
    isVisible: boolean
  ) {
    try {
      setImageActionId(`${slab.id}:${imageId}:visibility`);
      setErrorMessage("");

      const updatedSlab = await updateAdminSlabImageVisibility(
        slab.id,
        imageId,
        !isVisible
      );

      replaceSlabInState(updatedSlab);
    } catch (error) {
      console.error("Failed to update image visibility:", error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "The image visibility could not be updated."
      );
    } finally {
      setImageActionId("");
    }
  }

  async function handleImageTypeChange(
    slab: AdminSlab,
    imageId: string,
    imageType: Exclude<SlabImageType, "primary">
  ) {
    try {
      setImageActionId(`${slab.id}:${imageId}:type`);
      setErrorMessage("");

      const updatedSlab = await updateAdminSlabImageType(
        slab.id,
        imageId,
        imageType
      );

      replaceSlabInState(updatedSlab);
    } catch (error) {
      console.error("Failed to update image type:", error);
      setErrorMessage("The image type could not be updated.");
    } finally {
      setImageActionId("");
    }
  }

  async function handleImageMove(
    slab: AdminSlab,
    imageId: string,
    direction: "up" | "down"
  ) {
    try {
      setImageActionId(`${slab.id}:${imageId}:move-${direction}`);
      setErrorMessage("");

      const updatedSlab = await moveAdminSlabImage(slab.id, imageId, direction);
      replaceSlabInState(updatedSlab);
    } catch (error) {
      console.error("Failed to move image:", error);
      setErrorMessage("The image order could not be updated.");
    } finally {
      setImageActionId("");
    }
  }

  async function handleImageDelete(slab: AdminSlab, imageId: string) {
    const confirmed = window.confirm(
      `Delete this image from "${slab.name}"?\n\nPrimary images cannot be deleted until another image is set as primary.`
    );

    if (!confirmed) {
      return;
    }

    try {
      setImageActionId(`${slab.id}:${imageId}:delete`);
      setErrorMessage("");

      const updatedSlab = await deleteAdminSlabImage(slab.id, imageId);
      replaceSlabInState(updatedSlab);
    } catch (error) {
      console.error("Failed to delete image:", error);
      setErrorMessage(
        error instanceof Error ? error.message : "The image could not be deleted."
      );
    } finally {
      setImageActionId("");
    }
  }

  async function handleDeleteSlab(slab: AdminSlab) {
    const confirmed = window.confirm(
      `Permanently delete "${slab.name}"?\n\nThis removes the slab listing from admin and public inventory. This cannot be undone.`
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(slab.id);
      setErrorMessage("");

      await deleteAdminSlab(slab.id);

      setSlabs((currentSlabs) =>
        currentSlabs.filter((currentSlab) => currentSlab.id !== slab.id)
      );

      if (editingId === slab.id) {
        closeEditForm();
      }
    } catch (error) {
      console.error("Failed to delete slab:", error);
      setErrorMessage(
        "The slab could not be deleted. Please confirm your admin delete policy and permissions."
      );
    } finally {
      setDeletingId("");
    }
  }

  function handleStatusChange(slab: AdminSlab, nextStatus: Slab["status"]) {
    updateSlabOptimistically(slab.id, { status: nextStatus }, () =>
      updateAdminSlabStatus(slab.id, nextStatus)
    );
  }

  function handleFeaturedToggle(slab: AdminSlab) {
    const nextValue = !slab.isFeatured;

    updateSlabOptimistically(slab.id, { isFeatured: nextValue }, () =>
      updateAdminSlabFeatured(slab.id, nextValue)
    );
  }

  function handleNewArrivalToggle(slab: AdminSlab) {
    const nextValue = !slab.isNewArrival;

    updateSlabOptimistically(slab.id, { isNewArrival: nextValue }, () =>
      updateAdminSlabNewArrival(slab.id, nextValue)
    );
  }

  function handleActiveToggle(slab: AdminSlab) {
    const nextValue = !slab.isActive;

    updateSlabOptimistically(slab.id, { isActive: nextValue }, () =>
      updateAdminSlabActive(slab.id, nextValue)
    );
  }

  return (
    <section className="admin-page">
      <div className="container">
        <div className="admin-header">
          <div>
            <Link to="/admin" className="back-link">
              <ArrowLeft size={17} />
              Back to Dashboard
            </Link>

            <p className="eyebrow">Admin Inventory</p>
            <h1>Manage Slabs</h1>
            <p>
              Review inventory, add new slabs, update availability, upload slab
              images, and control which slabs appear as active, featured, or new
              arrivals.
            </p>
          </div>

          <div className="admin-header-actions">
            <button
              type="button"
              className={
                showCreateForm ? "btn btn-secondary" : "btn btn-primary"
              }
              onClick={() => {
                setShowCreateForm((currentValue) => !currentValue);
                setErrorMessage("");
              }}
              disabled={isCreating}
            >
              {showCreateForm ? <X size={16} /> : <Plus size={16} />}
              {showCreateForm ? "Cancel New Slab" : "Add New Slab"}
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => loadSlabs({ showRefreshingState: true })}
              disabled={isRefreshing || isLoading}
            >
              <RefreshCcw size={16} />
              {isRefreshing ? "Refreshing..." : "Refresh Inventory"}
            </button>

            <Link to="/live-inventory" className="btn btn-secondary">
              View Public Inventory
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <div className="admin-stat-grid">
          <article className="admin-stat-card">
            <Gem size={24} />
            <span>Total Slabs</span>
            <strong>{slabCounts.total}</strong>
          </article>

          <article className="admin-stat-card">
            <ToggleRight size={24} />
            <span>Active</span>
            <strong>{slabCounts.active}</strong>
          </article>

          <article className="admin-stat-card">
            <Star size={24} />
            <span>Featured</span>
            <strong>{slabCounts.featured}</strong>
          </article>

          <article className="admin-stat-card">
            <ToggleLeft size={24} />
            <span>Sold</span>
            <strong>{slabCounts.sold}</strong>
          </article>
        </div>

        {showCreateForm && (
          <div className="admin-panel">
            <div className="admin-panel-header">
              <div>
                <p className="eyebrow">New Inventory</p>
                <h2>Add New Slab</h2>
                <p>
                  Create a new inventory item and upload its main image directly
                  from your computer.
                </p>
              </div>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={resetCreateForm}
                disabled={isCreating}
              >
                <X size={16} />
                Close
              </button>
            </div>

            <form className="admin-slab-edit-form" onSubmit={handleCreateSubmit}>
              <div className="admin-form-grid">
                <label>
                  Slab Name
                  <input
                    type="text"
                    value={createForm.name}
                    onChange={(event) =>
                      handleCreateNameChange(event.target.value)
                    }
                    placeholder="Taj Mahal Quartzite"
                    required
                  />
                </label>

                <label>
                  URL Slug
                  <input
                    type="text"
                    value={createForm.slug}
                    onChange={(event) =>
                      updateCreateForm("slug", slugify(event.target.value))
                    }
                    placeholder="taj-mahal-quartzite"
                    required
                  />
                </label>

                <label>
                  Material Type
                  <input
                    type="text"
                    value={createForm.materialType}
                    onChange={(event) =>
                      updateCreateForm("materialType", event.target.value)
                    }
                    placeholder="Quartzite"
                    required
                  />
                </label>

                <label>
                  Color Family
                  <input
                    type="text"
                    value={createForm.colorFamily}
                    onChange={(event) =>
                      updateCreateForm("colorFamily", event.target.value)
                    }
                    placeholder="Warm White"
                  />
                </label>

                <label>
                  Thickness
                  <input
                    type="text"
                    value={createForm.thickness}
                    onChange={(event) =>
                      updateCreateForm("thickness", event.target.value)
                    }
                    placeholder="3cm"
                  />
                </label>

                <label>
                  Dimensions
                  <input
                    type="text"
                    value={createForm.dimensions}
                    onChange={(event) =>
                      updateCreateForm("dimensions", event.target.value)
                    }
                    placeholder="128 x 77"
                  />
                </label>

                <label>
                  Finish
                  <input
                    type="text"
                    value={createForm.finish}
                    onChange={(event) =>
                      updateCreateForm("finish", event.target.value)
                    }
                    placeholder="Polished"
                  />
                </label>

                <label>
                  Inventory Type
                  <select
                    value={createForm.inventoryType}
                    onChange={(event) =>
                      updateCreateForm(
                        "inventoryType",
                        event.target.value as Slab["inventoryType"]
                      )
                    }
                  >
                    {inventoryTypes.map((type) => (
                      <option key={type} value={type}>
                        {formatLabel(type)}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  Status
                  <select
                    value={createForm.status}
                    onChange={(event) =>
                      updateCreateForm(
                        "status",
                        event.target.value as Slab["status"]
                      )
                    }
                  >
                    {slabStatuses.map((status) => (
                      <option key={status} value={status}>
                        {formatLabel(status)}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  Public Visibility
                  <select
                    value={String(createForm.isActive)}
                    onChange={(event) =>
                      updateCreateForm("isActive", event.target.value === "true")
                    }
                  >
                    <option value="true">Active / Public</option>
                    <option value="false">Inactive / Hidden</option>
                  </select>
                </label>

                <label>
                  Featured
                  <select
                    value={String(createForm.isFeatured)}
                    onChange={(event) =>
                      updateCreateForm(
                        "isFeatured",
                        event.target.value === "true"
                      )
                    }
                  >
                    <option value="false">Not Featured</option>
                    <option value="true">Featured</option>
                  </select>
                </label>

                <label>
                  New Arrival
                  <select
                    value={String(createForm.isNewArrival)}
                    onChange={(event) =>
                      updateCreateForm(
                        "isNewArrival",
                        event.target.value === "true"
                      )
                    }
                  >
                    <option value="true">New Arrival</option>
                    <option value="false">Not New</option>
                  </select>
                </label>

                <div className="admin-form-span-2 admin-file-upload-field">
                  <span>Main Slab Image</span>

                  <label className="admin-file-upload-box">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleCreateImageSelect}
                      disabled={isCreating}
                    />

                    <Upload size={18} />
                    <strong>Choose Image From Computer</strong>
                    <small>{getSelectedFileName(createImageFile)}</small>
                  </label>
                </div>

                <label className="admin-form-span-2">
                  Style Tags
                  <input
                    type="text"
                    value={createForm.styleTags}
                    onChange={(event) =>
                      updateCreateForm("styleTags", event.target.value)
                    }
                    placeholder="Luxury, Warm Neutral, Bookmatched"
                  />
                </label>

                <label className="admin-form-span-2">
                  Description
                  <textarea
                    value={createForm.description}
                    onChange={(event) =>
                      updateCreateForm("description", event.target.value)
                    }
                    rows={4}
                    placeholder="Public slab description shown on the inventory detail page."
                  />
                </label>

                <label className="admin-form-span-2">
                  Internal Notes
                  <textarea
                    value={createForm.internalNotes}
                    onChange={(event) =>
                      updateCreateForm("internalNotes", event.target.value)
                    }
                    rows={3}
                    placeholder="Private admin notes. Not shown publicly."
                  />
                </label>
              </div>

              <div className="admin-form-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={resetCreateForm}
                  disabled={isCreating}
                >
                  <X size={16} />
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isCreating}
                >
                  <Save size={16} />
                  {isCreating ? "Uploading + Creating..." : "Create Slab"}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="admin-panel admin-inquiries-toolbar">
          <div>
            <p className="eyebrow">Inventory Filter</p>
            <h2>All Slabs</h2>
            <p>
              Showing {filteredSlabs.length} of {slabs.length} inventory items.
            </p>
          </div>

          <div className="admin-inquiry-actions">
            <label>
              Search
              <div className="admin-search-control">
                <Search size={16} />
                <input
                  type="search"
                  value={searchTerm}
                  placeholder="Search slab name, color, material..."
                  onChange={(event) => setSearchTerm(event.target.value)}
                />
              </div>
            </label>

            <label className="admin-filter-control">
              Status
              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value as Slab["status"] | "all")
                }
              >
                <option value="all">All Statuses</option>
                {slabStatuses.map((status) => (
                  <option key={status} value={status}>
                    {formatLabel(status)}
                  </option>
                ))}
              </select>
            </label>

            <label className="admin-filter-control">
              Material
              <select
                value={materialFilter}
                onChange={(event) => setMaterialFilter(event.target.value)}
              >
                <option value="all">All Materials</option>
                {materialOptions.map((material) => (
                  <option key={material} value={material}>
                    {material}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {errorMessage && (
          <div className="admin-state-card admin-error-card">
            <h2>Admin action failed</h2>
            <p>{errorMessage}</p>
          </div>
        )}

        {isLoading && (
          <div className="admin-state-card">
            <h2>Loading inventory...</h2>
            <p>Pulling slab records from Supabase.</p>
          </div>
        )}

        {!isLoading && filteredSlabs.length === 0 && (
          <div className="admin-state-card">
            <Gem size={28} />
            <h2>No slabs found.</h2>
            <p>
              No inventory items match the current search or filter settings.
            </p>
          </div>
        )}

        {!isLoading && filteredSlabs.length > 0 && (
          <div className="admin-slab-management-list">
            {filteredSlabs.map((slab) => {
              const isUpdating =
                updatingId === slab.id ||
                savingId === slab.id ||
                deletingId === slab.id ||
                uploadingGalleryId === slab.id ||
                imageActionId.startsWith(`${slab.id}:`);
              const isEditing = editingId === slab.id && editForm;
              const sortedImages = getSortedSlabImages(slab);

              return (
                <article key={slab.id} className="admin-slab-management-card">
                  <div className="admin-slab-management-image-wrap">
                    <img
                      src={slab.imageUrl}
                      alt={slab.name}
                      className="admin-slab-management-image"
                    />
                  </div>

                  <div className="admin-slab-management-body">
                    <div className="admin-slab-management-header">
                      <div>
                        <p className="eyebrow">{slab.materialType}</p>
                        <h2>{slab.name}</h2>
                        <p>
                          {slab.colorFamily} · {slab.thickness} · {slab.finish}
                        </p>
                      </div>

                      <span className="admin-status-pill">
                        {formatLabel(slab.status)}
                      </span>
                    </div>

                    <div className="admin-slab-management-specs">
                      <div>
                        <span>Dimensions</span>
                        <strong>{slab.dimensions || "Not listed"}</strong>
                      </div>

                      <div>
                        <span>Inventory Type</span>
                        <strong>{formatLabel(slab.inventoryType)}</strong>
                      </div>

                      <div>
                        <span>Updated</span>
                        <strong>{formatDate(slab.updatedAt)}</strong>
                      </div>
                    </div>

                    <div className="admin-slab-management-controls">
                      <label>
                        Status
                        <select
                          value={slab.status}
                          disabled={isUpdating}
                          onChange={(event) =>
                            handleStatusChange(
                              slab,
                              event.target.value as Slab["status"]
                            )
                          }
                        >
                          {slabStatuses.map((status) => (
                            <option key={status} value={status}>
                              {formatLabel(status)}
                            </option>
                          ))}
                        </select>
                      </label>

                      <button
                        type="button"
                        className={
                          slab.isActive
                            ? "btn btn-primary"
                            : "btn btn-secondary"
                        }
                        disabled={isUpdating}
                        onClick={() => handleActiveToggle(slab)}
                      >
                        {slab.isActive ? "Active" : "Inactive"}
                      </button>

                      <button
                        type="button"
                        className={
                          slab.isFeatured
                            ? "btn btn-primary"
                            : "btn btn-secondary"
                        }
                        disabled={isUpdating}
                        onClick={() => handleFeaturedToggle(slab)}
                      >
                        {slab.isFeatured ? "Featured" : "Not Featured"}
                      </button>

                      <button
                        type="button"
                        className={
                          slab.isNewArrival
                            ? "btn btn-primary"
                            : "btn btn-secondary"
                        }
                        disabled={isUpdating}
                        onClick={() => handleNewArrivalToggle(slab)}
                      >
                        {slab.isNewArrival ? "New Arrival" : "Not New"}
                      </button>

                      <button
                        type="button"
                        className="btn btn-secondary"
                        disabled={isUpdating}
                        onClick={() =>
                          isEditing ? closeEditForm() : openEditForm(slab)
                        }
                      >
                        {isEditing ? <X size={16} /> : <Pencil size={16} />}
                        {isEditing ? "Cancel Edit" : "Edit Details"}
                      </button>

                      <Link
                        to={`/live-inventory/${slab.slug}`}
                        className="btn btn-secondary"
                      >
                        <Eye size={16} />
                        View Public
                      </Link>

                      <button
                        type="button"
                        className="btn btn-secondary admin-danger-button"
                        disabled={isUpdating}
                        onClick={() => handleDeleteSlab(slab)}
                      >
                        <Trash2 size={16} />
                        {deletingId === slab.id ? "Deleting..." : "Delete Slab"}
                      </button>
                    </div>

                    {isEditing && editForm && (
                      <>
                        <form
                          className="admin-slab-edit-form"
                          onSubmit={(event) => handleEditSubmit(event, slab)}
                        >
                        <div className="admin-form-grid">
                          <label>
                            Slab Name
                            <input
                              type="text"
                              value={editForm.name}
                              onChange={(event) =>
                                updateEditForm("name", event.target.value)
                              }
                              required
                            />
                          </label>

                          <label>
                            Material Type
                            <input
                              type="text"
                              value={editForm.materialType}
                              onChange={(event) =>
                                updateEditForm(
                                  "materialType",
                                  event.target.value
                                )
                              }
                              required
                            />
                          </label>

                          <label>
                            Color Family
                            <input
                              type="text"
                              value={editForm.colorFamily}
                              onChange={(event) =>
                                updateEditForm(
                                  "colorFamily",
                                  event.target.value
                                )
                              }
                            />
                          </label>

                          <label>
                            Thickness
                            <input
                              type="text"
                              value={editForm.thickness}
                              onChange={(event) =>
                                updateEditForm("thickness", event.target.value)
                              }
                            />
                          </label>

                          <label>
                            Dimensions
                            <input
                              type="text"
                              value={editForm.dimensions}
                              onChange={(event) =>
                                updateEditForm("dimensions", event.target.value)
                              }
                            />
                          </label>

                          <label>
                            Finish
                            <input
                              type="text"
                              value={editForm.finish}
                              onChange={(event) =>
                                updateEditForm("finish", event.target.value)
                              }
                            />
                          </label>

                          <label>
                            Inventory Type
                            <select
                              value={editForm.inventoryType}
                              onChange={(event) =>
                                updateEditForm(
                                  "inventoryType",
                                  event.target.value as Slab["inventoryType"]
                                )
                              }
                            >
                              {inventoryTypes.map((type) => (
                                <option key={type} value={type}>
                                  {formatLabel(type)}
                                </option>
                              ))}
                            </select>
                          </label>

                          <label>
                            Status
                            <select
                              value={editForm.status}
                              onChange={(event) =>
                                updateEditForm(
                                  "status",
                                  event.target.value as Slab["status"]
                                )
                              }
                            >
                              {slabStatuses.map((status) => (
                                <option key={status} value={status}>
                                  {formatLabel(status)}
                                </option>
                              ))}
                            </select>
                          </label>

                          <div className="admin-form-span-2 admin-file-upload-field">
                            <span>Replace Main Slab Image</span>

                            <label className="admin-file-upload-box">
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleEditImageSelect}
                                disabled={savingId === slab.id}
                              />

                              <Image size={18} />
                              <strong>Choose Replacement Image</strong>
                              <small>{getSelectedFileName(editImageFile)}</small>
                            </label>

                            <p>
                              Leave this blank to keep the current slab image.
                            </p>
                          </div>

                          <label className="admin-form-span-2">
                            Style Tags
                            <input
                              type="text"
                              value={editForm.styleTags}
                              onChange={(event) =>
                                updateEditForm("styleTags", event.target.value)
                              }
                              placeholder="Luxury, Warm Neutral, Taj Mahal Look"
                            />
                          </label>

                          <label className="admin-form-span-2">
                            Description
                            <textarea
                              value={editForm.description}
                              onChange={(event) =>
                                updateEditForm("description", event.target.value)
                              }
                              rows={4}
                            />
                          </label>

                          <label className="admin-form-span-2">
                            Internal Notes
                            <textarea
                              value={editForm.internalNotes}
                              onChange={(event) =>
                                updateEditForm(
                                  "internalNotes",
                                  event.target.value
                                )
                              }
                              rows={3}
                              placeholder="Private admin notes. Not shown publicly."
                            />
                          </label>
                        </div>

                        <div className="admin-form-actions">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={closeEditForm}
                            disabled={savingId === slab.id}
                          >
                            <X size={16} />
                            Cancel
                          </button>

                          <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={savingId === slab.id}
                          >
                            <Save size={16} />
                            {savingId === slab.id
                              ? "Uploading + Saving..."
                              : "Save Changes"}
                          </button>
                        </div>
                      </form>

                        <div className="admin-slab-image-manager">
                          <div className="admin-slab-image-manager-header">
                            <div>
                              <p className="eyebrow">Slab Images</p>
                              <h3>Gallery Manager</h3>
                              <p>
                                Control the main inventory image, detail page
                                thumbnails, image order, and inspiration photos.
                              </p>
                            </div>
                          </div>

                          <form
                            className="admin-gallery-upload-form"
                            onSubmit={(event) => handleGalleryUpload(event, slab)}
                          >
                            <div className="admin-gallery-upload-grid">
                              <div className="admin-file-upload-field">
                                <span>Add Gallery Image</span>

                                <label className="admin-file-upload-box admin-gallery-upload-box">
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(event) =>
                                      handleGalleryImageSelect(slab.id, event)
                                    }
                                    disabled={uploadingGalleryId === slab.id}
                                  />

                                  <Upload size={18} />
                                  <strong>Choose Additional Image</strong>
                                  <small>
                                    {getSelectedFileName(
                                      galleryFiles[slab.id] ?? null
                                    )}
                                  </small>
                                </label>
                              </div>

                              <label>
                                Image Type
                                <select
                                  value={galleryTypes[slab.id] || "gallery"}
                                  onChange={(event) =>
                                    updateGalleryType(
                                      slab.id,
                                      event.target.value as Exclude<
                                        SlabImageType,
                                        "primary"
                                      >
                                    )
                                  }
                                >
                                  {galleryImageTypes.map((imageType) => (
                                    <option key={imageType} value={imageType}>
                                      {formatLabel(imageType)}
                                    </option>
                                  ))}
                                </select>
                              </label>

                              <label>
                                Alt Text
                                <input
                                  type="text"
                                  value={galleryAltTexts[slab.id] || ""}
                                  onChange={(event) =>
                                    updateGalleryAltText(
                                      slab.id,
                                      event.target.value
                                    )
                                  }
                                  placeholder={`${slab.name} detail image`}
                                />
                              </label>
                            </div>

                            <div className="admin-form-actions">
                              <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={uploadingGalleryId === slab.id}
                              >
                                <Upload size={16} />
                                {uploadingGalleryId === slab.id
                                  ? "Uploading..."
                                  : "Upload Gallery Image"}
                              </button>
                            </div>
                          </form>

                          {sortedImages.length === 0 ? (
                            <div className="admin-state-card">
                              <h3>No slab images found.</h3>
                              <p>
                                Upload a primary image or gallery image to build
                                the detail page carousel.
                              </p>
                            </div>
                          ) : (
                            <div className="admin-slab-image-grid">
                              {sortedImages.map((image, index) => {
                                const isFirst = index === 0;
                                const isLast = index === sortedImages.length - 1;
                                const isImageBusy = imageActionId.startsWith(
                                  `${slab.id}:${image.id}:`
                                );

                                return (
                                  <article
                                    key={image.id}
                                    className={
                                      image.isPrimary
                                        ? "admin-slab-image-card admin-slab-image-card-primary"
                                        : "admin-slab-image-card"
                                    }
                                  >
                                    <div className="admin-slab-image-preview">
                                      <img
                                        src={image.imageUrl}
                                        alt={image.altText || slab.name}
                                      />

                                      <div className="admin-slab-image-badges">
                                        {image.isPrimary && <span>Primary</span>}
                                        {!image.isVisible && <span>Hidden</span>}
                                        <span>{formatLabel(image.imageType)}</span>
                                      </div>
                                    </div>

                                    <div className="admin-slab-image-body">
                                      <p>
                                        {image.altText ||
                                          `${slab.name} slab image`}
                                      </p>

                                      <label>
                                        Type
                                        <select
                                          value={
                                            image.isPrimary
                                              ? "primary"
                                              : image.imageType
                                          }
                                          disabled={
                                            image.isPrimary || isImageBusy
                                          }
                                          onChange={(event) =>
                                            handleImageTypeChange(
                                              slab,
                                              image.id,
                                              event.target.value as Exclude<
                                                SlabImageType,
                                                "primary"
                                              >
                                            )
                                          }
                                        >
                                          <option value="primary">
                                            Primary
                                          </option>
                                          {galleryImageTypes.map((imageType) => (
                                            <option
                                              key={imageType}
                                              value={imageType}
                                            >
                                              {formatLabel(imageType)}
                                            </option>
                                          ))}
                                        </select>
                                      </label>

                                      <div className="admin-slab-image-actions">
                                        <button
                                          type="button"
                                          className="btn btn-secondary"
                                          disabled={
                                            image.isPrimary || isImageBusy
                                          }
                                          onClick={() =>
                                            handleSetPrimaryImage(slab, image.id)
                                          }
                                        >
                                          <Star size={15} />
                                          Set Primary
                                        </button>

                                        <button
                                          type="button"
                                          className="btn btn-secondary"
                                          disabled={
                                            image.isPrimary || isImageBusy
                                          }
                                          onClick={() =>
                                            handleImageVisibilityToggle(
                                              slab,
                                              image.id,
                                              image.isVisible
                                            )
                                          }
                                        >
                                          {image.isVisible ? (
                                            <EyeOff size={15} />
                                          ) : (
                                            <Eye size={15} />
                                          )}
                                          {image.isVisible ? "Hide" : "Show"}
                                        </button>

                                        <button
                                          type="button"
                                          className="btn btn-secondary"
                                          disabled={isFirst || isImageBusy}
                                          onClick={() =>
                                            handleImageMove(
                                              slab,
                                              image.id,
                                              "up"
                                            )
                                          }
                                        >
                                          <ArrowUp size={15} />
                                          Up
                                        </button>

                                        <button
                                          type="button"
                                          className="btn btn-secondary"
                                          disabled={isLast || isImageBusy}
                                          onClick={() =>
                                            handleImageMove(
                                              slab,
                                              image.id,
                                              "down"
                                            )
                                          }
                                        >
                                          <ArrowDown size={15} />
                                          Down
                                        </button>

                                        <button
                                          type="button"
                                          className="btn btn-secondary admin-danger-button"
                                          disabled={
                                            image.isPrimary || isImageBusy
                                          }
                                          onClick={() =>
                                            handleImageDelete(slab, image.id)
                                          }
                                        >
                                          <Trash2 size={15} />
                                          Delete
                                        </button>
                                      </div>
                                    </div>
                                  </article>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
