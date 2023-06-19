<form method="post" action="{{url('/api/gestion')}}">
    <div className="mb-3">
        <label htmlFor="intérêt" className="form-label">intérêt</label>
        <input type="text" className="form-control" name="intérêt" aria-describedby="emailHelp" onChange={handleChangeform} />
    </div>
    <div className="mb-3">
        <label htmlFor="ubrique_envoyée" className="form-label">ubrique envoyée</label>
        <input type="text" className="form-control" name="ubrique_envoyée" onChange={handleChangeform} aria-describedby="emailHelp" />
    </div>
    <div className="mb-3">
        <label htmlFor="destinataire" className="form-label">destinataire</label>
        <input type="text" className="form-control" name="destinataire" aria-describedby="emailHelp" onChange={handleChangeform} />
    </div>
    <div className="mb-3">
        <label htmlFor="sujet" className="form-label">sujet</label>
        <input type="text" className="form-control" name="sujet" aria-describedby="emailHelp" onChange={handleChangeform} />
    </div>
    <div className="mb-3">
        <label htmlFor="date" className="form-label">date</label>
        <input type="date" className="form-control" name="date" aria-describedby="emailHelp" onChange={handleChangeform} />
    </div>
    <select class="form-select" size="3" name="type_courriel" aria-label="size 3 select example" onChange={handleChangeform}>
        <option selected>choisissez s'il vous plait</option>
        <option value="archive">archive</option>
        <option value="travail effectué">travail effectué</option>
    </select>
    <div class="mb-3">
        <label for="formFile" class="form-label">upload your file</label>
        <input class="form-control" type="file" id="formFile" />
    </div>
    <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" className="btn btn-primary">Save changes</button>
    </div>
</form>
